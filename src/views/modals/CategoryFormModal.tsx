import { Formik, FormikProps } from "formik";
import { Map } from "immutable";
import React, { useCallback } from "react";
import * as Yup from "yup";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import { CreateGradeCategoryCreator, EditGradeCategoryCreator } from "../../state/ducks/data/gradeCategories";
import { useMapDispatch } from "../../state/hooks";
import Button from "../components/shared/Button";
import { useFormBuilder } from "./common/FormBuilder";

interface Props {
    isCreating: boolean;
    initialValues?: CategoryForm;
    originalCategory?: GradeCategory;
    categories?: Map<string, GradeCategory>;
    course?: Course;

    exitModal: () => void;
}

interface CategoryForm {
    title: string;
    percentage: number;
    numberOfGrades: number;
}

const CategoryFormModal = ({exitModal, ...props}: Props) => {

    //#region Redux State
    const actions = useMapDispatch({
        createCategory: CreateGradeCategoryCreator,
        updateCategory: EditGradeCategoryCreator,
    });
    //#endregion

    //#region Private Methods
    const handleFormSubmit = useCallback((values: CategoryForm) => {
        if (props.isCreating && props.course) {
            const category = new GradeCategory({
                courseId: props.course.id,
                title: values.title,
                percentage: +values.percentage,
                numberOfGrades: +values.numberOfGrades,
            });
            actions.createCategory(category, props.course.id || "");
            exitModal();
        } else if (props.originalCategory) {
            const category = new GradeCategory({
                id: props.originalCategory.id,
                courseId: props.originalCategory.courseId,
                title: values.title,
                percentage: +values.percentage,
                numberOfGrades: +values.numberOfGrades,
            });
            actions.updateCategory(category);
            exitModal();
        }
    }, [actions, exitModal, props.course, props.isCreating, props.originalCategory]);
    //#endregion

    //#region Display Methods
    const buildFormValue = useFormBuilder;
    //#endregion

    //#region Render Method
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
                title: Yup
                    .string()
                    .required("Grade Category is Required"),
                percentage: Yup
                    .number()
                    .positive("Percentage has to be positive.")
                    .lessThan(props.categories 
                        ? 101 - props.categories
                            .map((g) => g.percentage)
                            .reduce((acc: number, val) => acc += val, 0)
                        : 101, "Max percentage is 100")
                    .required("Percentage is required"),
                numberOfGrades: Yup
                    .number()
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
                        true,
                        formProps.errors.title,
                    )}
                    {buildFormValue(
                        "Category Percentage",
                        formProps.values.percentage,
                        formProps,
                        "percentage",
                        true,
                        formProps.errors.percentage,
                    )}
                    {buildFormValue(
                        "Number of Grades",
                        formProps.values.numberOfGrades,
                        formProps,
                        "numberOfGrades",
                        true,
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
    //#endregion
};

export default CategoryFormModal;
