import { Formik, FormikProps } from "formik";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Grade } from "src/models/Grade";
import { GradeCategory } from "src/models/GradeCategory";
import { CreateGradeCreator, EditGradeCreator } from "src/state/ducks/data/gradeCategories";
import styled from "styled-components";
import * as Yup from "yup";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/Button";

interface PassedProps {
    isCreating?: boolean;
    initialValues?: GradeForm;
    gradeCategory?: GradeCategory;
    originalGrade?: Grade;

    exitModal: () => void;
}

interface PropsFromDispatch {
    handleCreateGrade: typeof CreateGradeCreator;
    handleEditGrade: typeof EditGradeCreator;
}

type Props = PassedProps & PropsFromDispatch;

interface GradeForm {
    name: string;
    grade: number;
}

class GradeFormModal extends Component<Props> {
    public render() {
        return (
            <Formik
                initialValues={!this.props.isCreating && this.props.initialValues || {
                    name: "",
                    grade: 0,
                }}
                onSubmit={this.handleFormSubmit}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required("Name of Grade is Required"),
                    grade: Yup.number().required("Grade is Required"),
                })}
                render={this.renderForm}
            />
        );
    }

    private handleFormSubmit = (values: GradeForm) => {
        if (this.props.isCreating && this.props.gradeCategory) {
            const grade = new Grade({
                gradeCategoryId: this.props.gradeCategory.id,
                ...values,
            });
            this.props.handleCreateGrade(grade);
            this.props.exitModal();
        } else if (this.props.originalGrade) {
            const grade = new Grade({
                id: this.props.originalGrade.id,
                gradeCategoryId: this.props.originalGrade.gradeCategoryId,
                ...values,
            });
            this.props.handleEditGrade(grade);
            this.props.exitModal();
        }
    }

    private renderForm = (props: FormikProps<GradeForm>) => (
        <form onSubmit={props.handleSubmit}>
            {this.buildFormValue(
                "Grade Name",
                props.values.name,
                props,
                "name",
                props.errors.name,
            )}
            {this.buildFormValue(
                "Grade Value",
                props.values.grade,
                props,
                "grade",
                props.errors.grade,
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
        props: FormikProps<GradeForm>,
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
        handleCreateGrade: CreateGradeCreator,
        handleEditGrade: EditGradeCreator,
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(GradeFormModal);
