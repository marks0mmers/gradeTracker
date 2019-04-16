import { Formik, FormikProps } from "formik";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";
import * as Yup from "yup";
import { Grade } from "../../models/Grade";
import { GradeCategory } from "../../models/GradeCategory";
import { CreateGradeCreator, EditGradeCreator } from "../../state/ducks/data/gradeCategories";
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

const GradeFormModal = (componentProps: Props) => {

    const handleFormSubmit = (values: GradeForm) => {
        if (componentProps.isCreating && componentProps.gradeCategory) {
            const grade = new Grade({
                gradeCategoryId: componentProps.gradeCategory.id,
                ...values,
            });
            componentProps.handleCreateGrade(grade);
            componentProps.exitModal();
        } else if (componentProps.originalGrade) {
            const grade = new Grade({
                id: componentProps.originalGrade.id,
                gradeCategoryId: componentProps.originalGrade.gradeCategoryId,
                ...values,
            });
            componentProps.handleEditGrade(grade);
            componentProps.exitModal();
        }
    };

    const renderForm = (props: FormikProps<GradeForm>) => (
        <form onSubmit={props.handleSubmit}>
            {buildFormValue(
                "Grade Name",
                props.values.name,
                props,
                "name",
                props.errors.name,
            )}
            {buildFormValue(
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
    );

    const buildFormValue = (
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
    );
    return (
        <Formik
            initialValues={!componentProps.isCreating && componentProps.initialValues || {
                name: "",
                grade: 0,
            }}
            onSubmit={handleFormSubmit}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("Name of Grade is Required"),
                grade: Yup.number().required("Grade is Required"),
            })}
            render={renderForm}
        />
    );
};

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

export default connect<{}, PropsFromDispatch, PassedProps>(null, mapDispatchToProps)(GradeFormModal);
