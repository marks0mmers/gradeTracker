import { Formik, FormikProps } from "formik";
import React, { useCallback } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import Required from "../components/shared/Required";
import { Course } from "../../models/Course";
import { CreateNewCourseCreator, EditCourseCreator } from "../../state/ducks/data/courses";
import { getCurrentUser } from "../../state/ducks/data/users";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import Button from "../components/shared/Button";
import Input from "../components/styled-inputs/Input";

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

const CourseFormModal = (props: Props) => {

    //#region Prop Destructure
    const { exitModal } = props;
    //#endregion

    //#region Redux State
    const state = useMapState((state: RootState) => ({currentUser: getCurrentUser(state)}));

    const actions = useMapDispatch({
        createCourse: CreateNewCourseCreator,
        updateCourse: EditCourseCreator,
    });
    //#endregion

    //#region Display Methods
    const buildFormValue = useCallback((
        label: string,
        value: string | number,
        props: FormikProps<CourseForm>,
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

    //#region Private Methods
    const handleFormSubmit = useCallback((values: CourseForm) => {
        if (state.currentUser) {
            if (props.isCreating) {
                const course = new Course({
                    userId: state.currentUser._id,
                    ...values,
                });
                actions.createCourse(course);
                exitModal();
            } else if (props.originalCourse) {
                const course = new Course({
                    ...props.originalCourse.toObject(),
                    title: values.title,
                    description: values.description,
                    creditHours: values.creditHours,
                    section: values.section,
                });
                actions.updateCourse(course);
                exitModal();
            }
        }
    }, [actions, props.isCreating, props.originalCourse, exitModal, state.currentUser]);
    //#endregion

    //#region Render Method
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

export default CourseFormModal;
