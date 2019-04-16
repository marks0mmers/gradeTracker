import { Formik, FormikProps } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Course } from "src/models/Course";
import { GradeCategory } from "src/models/GradeCategory";
import { CreateGradeCategoryCreator, EditGradeCategoryCreator } from "src/state/ducks/data/gradeCategories";
import styled from "styled-components";
import * as Yup from "yup";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/Button";

interface PassedProps {
    isCreating: boolean;
    initialValues?: CategoryForm;
    originalCategory?: GradeCategory;
    course?: Course;

    exitModal: () => void;
}

interface PropsFromDispatch {
    handleCreateCategory: typeof CreateGradeCategoryCreator;
    handleUpdateCategory: typeof EditGradeCategoryCreator;
}

type Props = PassedProps & PropsFromDispatch;

interface CategoryForm {
    title: string;
    percentage: number;
    numberOfGrades: number;
}

class CategoryFormModal extends Component<Props> {
    public render() {
        return (
            <Formik
                initialValues={!this.props.isCreating && this.props.initialValues || {
                    title: "",
                    percentage: 1,
                    numberOfGrades: 1,
                }}
                onSubmit={this.handleFormSubmit}
                validationSchema={Yup.object().shape({
                    title: Yup.string()
                        .required("Grade Category is Required"),
                    percentage: Yup.number()
                        .positive("Percentage has to be positive.")
                        .lessThan(101, "Max percentage is 100")
                        .required("Percentage is required"),
                    numberOfGrades: Yup.number()
                        .positive("Number of Grades must be positive")
                        .required("Number of Grades is Required"),
                })}
                render={this.renderForm}
            />
        );
    }

    private handleFormSubmit = (values: CategoryForm) => {
        if (this.props.isCreating && this.props.course) {
            const category = new GradeCategory({
                courseId: this.props.course.id,
                ...values,
            });
            this.props.handleCreateCategory(category, this.props.course.id || "");
            this.props.exitModal();
        } else if (this.props.originalCategory) {
            const category = new GradeCategory({
                id: this.props.originalCategory.id,
                courseId: this.props.originalCategory.courseId,
                ...values,
            });
            this.props.handleUpdateCategory(category);
            this.props.exitModal();
        }
    }

    private renderForm = (props: FormikProps<CategoryForm>) => (
        <form onSubmit={props.handleSubmit}>
            {this.buildFormValue(
                "Category Title",
                props.values.title,
                props,
                "title",
                props.errors.title,
            )}
            {this.buildFormValue(
                "Category Percentage",
                props.values.percentage,
                props,
                "percentage",
                props.errors.percentage,
            )}
            {this.buildFormValue(
                "Number of Grades",
                props.values.numberOfGrades,
                props,
                "numberOfGrades",
                props.errors.numberOfGrades,
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
        props: FormikProps<CategoryForm>,
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
}

const LabelInput = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Error = styled.div`
    color: red;
`;

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        handleCreateCategory: CreateGradeCategoryCreator,
        handleUpdateCategory: EditGradeCategoryCreator,
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(CategoryFormModal);
