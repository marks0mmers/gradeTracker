import { Formik, FormikProps } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import { Course } from "../../models/Course";
import { CreateNewCourseCreator, EditCourseCreator } from "../../state/ducks/data/courses";
import { getCurrentUser } from "../../state/ducks/data/users";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import Button from "../components/shared/Button";
import { useFormBuilder } from "./common/FormBuilder";

interface Props {
    isCreating: boolean;
    initialValues?: CourseForm;
    originalCourse?: Course;

    exitModal: () => void;
}

interface CourseForm {
    title: string;
    description: string;
    section: number;
    creditHours: number;
}

const CourseFormModal = ({exitModal, ...props}: Props) => {

    const appState = useMapState((state: RootState) => ({currentUser: getCurrentUser(state)}));

    const dispatch = useMapDispatch({
        createCourse: CreateNewCourseCreator,
        updateCourse: EditCourseCreator,
    });

    const buildFormValue = useFormBuilder<CourseForm>();

    const handleFormSubmit = useCallback((values: CourseForm) => {
        if (appState.currentUser) {
            if (props.isCreating) {
                const course = new Course({
                    userId: appState.currentUser._id,
                    ...values,
                });
                dispatch.createCourse(course);
                exitModal();
            } else if (props.originalCourse) {
                const course = new Course({
                    id: props.originalCourse.id,
                    title: values.title,
                    description: values.description,
                    creditHours: values.creditHours,
                    section: values.section,
                });
                dispatch.updateCourse(course);
                exitModal();
            }
        }
    }, [dispatch, props.isCreating, props.originalCourse, exitModal, appState.currentUser]);

    return (
        <Formik
            initialValues={props.initialValues || {
                title: "",
                description: "",
                section: 0,
                creditHours: 0,
            }}
            onSubmit={handleFormSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object().shape({
                title: Yup
                    .string()
                    .max(8, "Course can only be up to 8 Characters")
                    .required(),
                description: Yup
                    .string()
                    .required(),
                section: Yup
                    .number()
                    .moreThan(0)
                    .required(),
                creditHours: Yup
                    .number()
                    .moreThan(0)
                    .lessThan(5)
                    .required(),
            })}
        >
            {(formProps: FormikProps<CourseForm>) => (
                <form onSubmit={formProps.handleSubmit}>
                    {buildFormValue(
                        "Course Title",
                        formProps.values.title,
                        formProps,
                        "title",
                        true,
                        formProps.errors.title,
                    )}
                    {buildFormValue(
                        "Course Description",
                        formProps.values.description,
                        formProps,
                        "description",
                        true,
                        formProps.errors.description,
                    )}
                    {buildFormValue(
                        "Course Section",
                        formProps.values.section,
                        formProps,
                        "section",
                        true,
                        formProps.errors.section,
                    )}
                    {buildFormValue(
                        "Credit Hours",
                        formProps.values.creditHours,
                        formProps,
                        "creditHours",
                        true,
                        formProps.errors.creditHours,
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

export default CourseFormModal;
