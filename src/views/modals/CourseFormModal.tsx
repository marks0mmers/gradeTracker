import { Formik, FormikProps } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Course } from "../../models/Course";
import { CreateNewCourseCreator, EditCourseCreator } from "../../state/ducks/data/courses";
import { getCurrentUser } from "../../state/ducks/data/users";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/Button";

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

const CourseFormModal = (componentProps: Props) => {

    const {currentUser} = useMapState((state: RootState) => ({currentUser: getCurrentUser(state)}));

    const {handleCreateCourse, handleUpdateCourse} = useMapDispatch({
        handleCreateCourse: CreateNewCourseCreator,
        handleUpdateCourse: EditCourseCreator,
    });

    const buildFormValue = (
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
    );

    const handleFormSubmit = (values: CourseForm) => {
        if (currentUser) {
            if (componentProps.isCreating) {
                const course = new Course({
                    userId: currentUser._id,
                    ...values,
                });
                handleCreateCourse(course);
                componentProps.exitModal();
            } else if (componentProps.originalCourse) {
                const course = new Course({
                    ...componentProps.originalCourse.toObject(),
                    title: values.title,
                    description: values.description,
                    creditHours: values.creditHours,
                    section: values.section,
                });
                handleUpdateCourse(course);
                componentProps.exitModal();
            }
        }
    };

    return (
        <Formik
            initialValues={componentProps.initialValues || {
                title: "",
                description: "",
                section: 0,
                creditHours: 0,
            }}
            onSubmit={handleFormSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object().shape({
                title: Yup.string().max(8, "Course can only be up to 8 Characters").required(),
                description: Yup.string().required(),
                section: Yup.number().moreThan(0).required(),
                creditHours: Yup.number().moreThan(0).lessThan(5).required(),
            })}
        >
            {(props: FormikProps<CourseForm>) => (
                <form onSubmit={props.handleSubmit}>
                    {buildFormValue(
                        "Course Title",
                        props.values.title,
                        props,
                        "title",
                        props.errors.title,
                    )}
                    {buildFormValue(
                        "Course Description",
                        props.values.description,
                        props,
                        "description",
                        props.errors.description,
                    )}
                    {buildFormValue(
                        "Course Section",
                        props.values.section,
                        props,
                        "section",
                        props.errors.section,
                    )}
                    {buildFormValue(
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

export default CourseFormModal;
