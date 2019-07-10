import { Formik, FormikProps } from "formik";
import React, { useCallback } from "react";
import styled from "styled-components";
import Required from "views/components/shared/Required";
import * as Yup from "yup";
import { Grade } from "../../models/Grade";
import { GradeCategory } from "../../models/GradeCategory";
import { CreateGradeCreator, EditGradeCreator } from "../../state/ducks/data/gradeCategories";
import { useMapDispatch } from "../../state/hooks";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/Button";

interface Props {
    isCreating?: boolean;
    initialValues?: GradeForm;
    gradeCategory?: GradeCategory;
    originalGrade?: Grade;

    exitModal: () => void;
}

interface GradeForm {
    name: string;
    grade: number;
}

const GradeFormModal = (componentProps: Props) => {

    //#region Prop Destructure
    const { exitModal } = componentProps;
    //#endregion

    //#region Redux State
    const {handleCreateGrade, handleEditGrade} = useMapDispatch({
        handleCreateGrade: CreateGradeCreator,
        handleEditGrade: EditGradeCreator,
    });
    //#endregion

    //#region Private Methods
    const handleFormSubmit = useCallback((values: GradeForm) => {
        if (componentProps.isCreating && componentProps.gradeCategory) {
            const grade = new Grade({
                gradeCategoryId: componentProps.gradeCategory.id,
                ...values,
            });
            handleCreateGrade(grade);
            exitModal();
        } else if (componentProps.originalGrade) {
            const grade = new Grade({
                id: componentProps.originalGrade.id,
                gradeCategoryId: componentProps.originalGrade.gradeCategoryId,
                ...values,
            });
            handleEditGrade(grade);
            exitModal();
        }
    }, [
        componentProps.gradeCategory,
        componentProps.isCreating,
        componentProps.originalGrade,
        exitModal,
        handleCreateGrade,
        handleEditGrade,
    ]);
    //#endregion

    //#region Display Methods
    const buildFormValue = useCallback((
        label: string,
        value: string | number,
        props: FormikProps<GradeForm>,
        name: string,
        required: boolean,
        error?: string,
    ) => (
        <LabelInput>
            {label}
            {required && <Required />}
            <Input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={value}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </LabelInput>
    ), []);
    //#endregion

    //#region Render Method
    return (
        <Formik
            initialValues={(!componentProps.isCreating && componentProps.initialValues) || {
                name: "",
                grade: 0,
            }}
            onSubmit={handleFormSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("Name of Grade is Required"),
                grade: Yup.number().required("Grade is Required"),
            })}
        >
            {(props: FormikProps<GradeForm>) => (
                <form onSubmit={props.handleSubmit}>
                    {buildFormValue(
                        "Grade Name",
                        props.values.name,
                        props,
                        "name",
                        true,
                        props.errors.name,
                    )}
                    {buildFormValue(
                        "Grade Value",
                        props.values.grade,
                        props,
                        "grade",
                        true,
                        props.errors.grade,
                    )}
                    <Button
                        type="submit"
                        text="Submit"
                        height={40}
                    />
                </form>
            )}
        </Formik>
    );
    //#endregion
};

//#region Styles
const LabelInput = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Error = styled.div`
    color: red;
`;
//#endregion

export default GradeFormModal;
