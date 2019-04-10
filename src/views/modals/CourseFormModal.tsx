import { Formik, FormikProps } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Course } from "src/models/Course";
import { User } from "src/models/User";
import { CreateNewCourseCreator, EditCourseCreator } from "src/state/ducks/data/courses";
import { getCurrentUser } from "src/state/ducks/data/users";
import { RootState } from "src/state/rootReducer";
import styled from "styled-components";
import * as Yup from "yup";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/Button";

interface PassedProps {
    className?: string;
    isCreating: boolean;
    initialValues?: CourseForm;
    originalCourse?: Course;

    exitModal: () => void;
}

interface PropsFromState {
    currentUser?: User;
}

interface PropsFromDispatch {
    handleCreateCourse: typeof CreateNewCourseCreator;
    handleUpdateCourse: typeof EditCourseCreator;
}

type Props = PassedProps & PropsFromState & PropsFromDispatch;

interface CourseForm {
    title: string;
    description: string;
    section: number;
    creditHours: number;
}

class CourseFormModal extends Component<Props> {
    public render() {
        return (
            <div className={this.props.className}>
                <Formik
                    initialValues={this.props.initialValues || {
                        title: "",
                        description: "",
                        section: 0,
                        creditHours: 0,
                    }}
                    onSubmit={this.handleFormSubmit}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().max(8, "Course can only be up to 8 Characters").required(),
                        description: Yup.string().required(),
                        section: Yup.number().moreThan(0).required(),
                        creditHours: Yup.number().moreThan(0).lessThan(5).required(),
                    })}
                    render={this.renderForm}
                />
            </div>
        );
    }

    private renderForm = (props: FormikProps<CourseForm>) => (
        <form onSubmit={props.handleSubmit}>
            {this.buildFormValue(
                "Course Title",
                props.values.title,
                props,
                "title",
                props.errors.title,
            )}
            {this.buildFormValue(
                "Course Description",
                props.values.description,
                props,
                "description",
                props.errors.description,
            )}
            {this.buildFormValue(
                "Course Section",
                props.values.section,
                props,
                "section",
                props.errors.section,
            )}
            {this.buildFormValue(
                "Credit Hours",
                props.values.creditHours,
                props,
                "creditHours",
                props.errors.creditHours,
            )}
            <Button
                type="submit"
                text="Submit"
                height={40}
            />
        </form>
    )

    private buildFormValue = (
        label: string,
        value: string | number,
        props: FormikProps<CourseForm>,
        name: string,
        error?: string,
    ) => (
        <LabelInput>
            {label}
            <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={value}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </LabelInput>
    )

    private handleFormSubmit = (values: CourseForm) => {
        if (this.props.currentUser) {
            if (this.props.isCreating) {
                const course = new Course({
                    userId: this.props.currentUser._id,
                    title: values.title,
                    description: values.description,
                    creditHours: values.creditHours,
                    section: values.section,
                });
                this.props.handleCreateCourse(course);
                this.props.exitModal();
            } else if (this.props.originalCourse) {
                const course = new Course({
                    ...this.props.originalCourse.toObject(),
                    title: values.title,
                    description: values.description,
                    creditHours: values.creditHours,
                    section: values.section,
                });
                this.props.handleUpdateCourse(course);
                this.props.exitModal();
            }
        }
    }
}

const LabelInput = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Error = styled.div`
    color: red;
`;

const mapStateToProps = (state: RootState): PropsFromState => ({
    currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        handleCreateCourse: CreateNewCourseCreator,
        handleUpdateCourse: EditCourseCreator,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseFormModal);
