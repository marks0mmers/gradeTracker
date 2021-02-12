import { Formik, FormikProps } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import { GradeCategory } from "../../models/GradeCategory";
import { CreateGradeCategoryCreator, EditGradeCategoryCreator } from "../../state/ducks/data/gradeCategories";
import { useMapDispatch, useMapState } from "../../state/hooks";
import Button from "../components/shared/Button";
import { useFormBuilder } from "./common/FormBuilder";
import { getActiveCourse } from "../../state/ducks/control/courses/selectors";
import { getGradeCategories } from "../../state/ducks/data/gradeCategories/selectors";

interface Props {
    isCreating: boolean;
    initialValues?: CategoryForm;
    originalCategory?: GradeCategory;

    exitModal: () => void;
}

interface CategoryForm {
    title: string;
    percentage: number;
    numberOfGrades: number;
}

const CategoryFormModal = ({exitModal, ...props}: Props) => {
    const appState = useMapState(state => ({
        course: getActiveCourse(state),
        categories: getGradeCategories(state),
    }));

    const dispatch = useMapDispatch({
        createCategory: CreateGradeCategoryCreator,
        updateCategory: EditGradeCategoryCreator,
    });

    const handleFormSubmit = useCallback((values: CategoryForm) => {
        if (props.isCreating && appState.course) {
            const category = new GradeCategory({
                courseId: appState.course.id,
                title: values.title,
                percentage: +values.percentage,
                numberOfGrades: +values.numberOfGrades,
            });
            dispatch.createCategory(category, appState.course.id || "");
            exitModal();
        } else if (props.originalCategory) {
            const category = new GradeCategory({
                id: props.originalCategory.id,
                courseId: props.originalCategory.courseId,
                title: values.title,
                percentage: +values.percentage,
                numberOfGrades: +values.numberOfGrades,
                grades: props.originalCategory.grades,
            });
            dispatch.updateCategory(category);
            exitModal();
        }
    }, [dispatch, exitModal, appState.course, props.isCreating, props.originalCategory]);

    const buildFormValue = useFormBuilder<CategoryForm>();

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
                    .lessThan(appState.categories 
                        ? 101 - appState.categories
                            .filter((g) => props.originalCategory ? g.id !== props.originalCategory.id : true)
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
};

export default CategoryFormModal;
