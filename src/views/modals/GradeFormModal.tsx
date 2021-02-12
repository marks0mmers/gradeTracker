import { Formik, FormikProps } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import { Grade } from "../../models/Grade";
import { GradeCategory } from "../../models/GradeCategory";
import { CreateGradeCreator, EditGradeCreator } from "../../state/ducks/data/gradeCategories";
import { useMapDispatch } from "../../state/hooks";
import Button from "../components/shared/Button";
import { useFormBuilder } from "./common/FormBuilder";

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

const GradeFormModal = ({exitModal, ...props}: Props) => {

    const dispatch = useMapDispatch({
        createGrade: CreateGradeCreator,
        editGrade: EditGradeCreator,
    });

    const handleFormSubmit = useCallback((values: GradeForm) => {
        if (props.isCreating && props.gradeCategory) {
            const grade = new Grade({
                gradeCategoryId: props.gradeCategory.id,
                ...values,
            });
            dispatch.createGrade(grade);
            exitModal();
        } else if (props.originalGrade) {
            const grade = new Grade({
                id: props.originalGrade.id,
                gradeCategoryId: props.originalGrade.gradeCategoryId,
                ...values,
            });
            dispatch.editGrade(grade);
            exitModal();
        }
    }, [dispatch, props.gradeCategory, props.isCreating, props.originalGrade, exitModal]);

    const buildFormValue = useFormBuilder<GradeForm>();

    return (
        <Formik
            initialValues={(!props.isCreating && props.initialValues) || {
                name: "",
                grade: 0,
            }}
            onSubmit={handleFormSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object().shape({
                name: Yup
                    .string()
                    .required("Name of Grade is Required"),
                grade: Yup
                    .number()
                    .min(0, "Grade must be at least 0")
                    .max(150, "Grade must be at most 150")
                    .required("Grade is Required"),
            })}
        >
            {(formProps: FormikProps<GradeForm>) => (
                <form onSubmit={formProps.handleSubmit}>
                    {buildFormValue(
                        "Grade Name",
                        formProps.values.name,
                        formProps,
                        "name",
                        true,
                        formProps.errors.name,
                    )}
                    {buildFormValue(
                        "Grade Value",
                        formProps.values.grade,
                        formProps,
                        "grade",
                        true,
                        formProps.errors.grade,
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

export default GradeFormModal;
