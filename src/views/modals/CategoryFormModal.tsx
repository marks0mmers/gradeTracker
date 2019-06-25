import { Formik, FormikProps } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import { CreateGradeCategoryCreator, EditGradeCategoryCreator } from "../../state/ducks/data/gradeCategories";
import { useMapDispatch } from "../../state/hooks";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/Button";

interface Props {
    isCreating: boolean;
    initialValues?: CategoryForm;
    originalCategory?: GradeCategory;
    course?: Course;

    exitModal: () => void;
}

interface CategoryForm {
    title: string;
    percentage: number;
    numberOfGrades: number;
}

const CategoryFormModal = (props: Props) => {

    const {handleCreateCategory, handleUpdateCategory} = useMapDispatch({
        handleCreateCategory: CreateGradeCategoryCreator,
        handleUpdateCategory: EditGradeCategoryCreator,
    });

    const handleFormSubmit = (values: CategoryForm) => {
        if (props.isCreating && props.course) {
            const category = new GradeCategory({
                courseId: props.course.id,
                title: values.title,
                percentage: +values.percentage,
                numberOfGrades: +values.numberOfGrades,
            });
            handleCreateCategory(category, props.course.id || "");
            props.exitModal();
        } else if (props.originalCategory) {
            const category = new GradeCategory({
                id: props.originalCategory.id,
                courseId: props.originalCategory.courseId,
                title: values.title,
                percentage: +values.percentage,
                numberOfGrades: +values.numberOfGrades,
            });
            handleUpdateCategory(category);
            props.exitModal();
        }
    };

    const buildFormValue = (
        label: string,
        value: string | number,
        formProps: FormikProps<CategoryForm>,
        name: string,
        error?: string,
    ) => (
        <LabelInput>
            {label}
            <Input
                type="text"
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                value={value}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </LabelInput>
    );

    return (
        <Formik
            initialValues={(!props.isCreating && props.initialValues) || {
                title: "",
                percentage: 1,
                numberOfGrades: 1,
            }}
            onSubmit={handleFormSubmit}
            validateOnBlur={false}
            validateOnChange={false}
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
        >
            {(formProps: FormikProps<CategoryForm>) => (
                <form onSubmit={formProps.handleSubmit}>
                    {buildFormValue(
                        "Category Title",
                        formProps.values.title,
                        formProps,
                        "title",
                        formProps.errors.title,
                    )}
                    {buildFormValue(
                        "Category Percentage",
                        formProps.values.percentage,
                        formProps,
                        "percentage",
                        formProps.errors.percentage,
                    )}
                    {buildFormValue(
                        "Number of Grades",
                        formProps.values.numberOfGrades,
                        formProps,
                        "numberOfGrades",
                        formProps.errors.numberOfGrades,
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
};

const LabelInput = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Error = styled.div`
    color: red;
`;

export default CategoryFormModal;
