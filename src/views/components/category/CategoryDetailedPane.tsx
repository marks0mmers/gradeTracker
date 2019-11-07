import React, { Fragment, useCallback, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { Grade } from "../../../models/Grade";
import { GradeCategory } from "../../../models/GradeCategory";
import { DeleteGradeCreator } from "../../../state/ducks/data/gradeCategories";
import { useMapDispatch } from "../../../state/hooks";
import Button from "../../../views/components/shared/Button";
import { ListControlElement } from "../../controls/list-control/models/ListControlElement";
import ListControl from "../../controls/list-control/package/ListControl";
import ModalHeader from "../../modals/common/ModalHeader";
import GradeFormModal from "../../modals/GradeFormModal";

interface Props {
    selectedCategory?: GradeCategory;
}

const CategoryDetailedPane = (props: Props) => {

    //#region Component State
    const [selectedGrade, setSelectedGrade] = useState<Grade | undefined>(undefined);
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    //#endregion

    //#region Redux State
    const actions = useMapDispatch({deleteGrade: DeleteGradeCreator});
    //#endregion

    //#region Private Methods
    const getListElements = useCallback(() => props.selectedCategory && props.selectedCategory.grades.map(
        (value: Grade) => {
            const element: ListControlElement = {
                isSelected: value === selectedGrade,
                primaryProperty: value.name,
                secondaryProperty: `${value.grade.toString()} %`,
            };
            return element;
        },
    ).toList(), [props.selectedCategory, selectedGrade]);

    const handleCancel = useCallback(() => {
        setIsCreating(false);
        setIsEditing(false);
    }, []);

    const handleNewGrade = useCallback(() => {
        if (props.selectedCategory && props.selectedCategory.numberOfGrades >= props.selectedCategory.grades.size + 1) {
            setIsCreating(true);
            setIsEditing(false);
        }
    }, [props.selectedCategory]);

    const handleEditGrade = useCallback(() => {
        if (selectedGrade) {
            setIsCreating(false);
            setIsEditing(true);
        }
    }, [selectedGrade]);

    const handleDeleteGrade = useCallback(() => {
        if (selectedGrade && props.selectedCategory) {
            actions.deleteGrade(selectedGrade.id);
        }
    }, [actions, props.selectedCategory, selectedGrade]);

    const handleSelectGrade = useCallback((primaryProperty: string) => {
        const selectedGradeObject = props.selectedCategory &&
            props.selectedCategory.grades.find((g: Grade) => g.name === primaryProperty);
        setSelectedGrade(selectedGradeObject);
    }, [props.selectedCategory]);
    //#endregion

    //#region Display Methods
    const buildDisplayLabel = useCallback((label: string, value: string | number, gridArea: string) => (
        <LabelContainer gridArea={gridArea}>
            <PropLabel>{label}</PropLabel>
            <PropValue>{value}</PropValue>
        </LabelContainer>
    ), []);
    //#endregion

    //#region Render Method
    return (
        <GridContainer>
            {buildDisplayLabel(
                "Category Name:",
                props.selectedCategory ? props.selectedCategory.title : "",
                "title",
            )}
            {buildDisplayLabel(
                "Percentage:",
                props.selectedCategory ? `${props.selectedCategory.percentage} %` : "",
                "percentage",
            )}
            {buildDisplayLabel(
                "Number of Grades:",
                props.selectedCategory ? props.selectedCategory.numberOfGrades : "",
                "numberGrades",
            )}
            {buildDisplayLabel(
                "Remaining Grades:",
                props.selectedCategory ? props.selectedCategory.remainingGrades : "",
                "gradesRemaining",
            )}
            {buildDisplayLabel(
                "Current Average:",
                props.selectedCategory ? `${props.selectedCategory.currentAverage.toPrecision(4)}` : "",
                "currentAverage",
            )}
            {buildDisplayLabel(
                "Guarenteed Average:",
                props.selectedCategory ? `${props.selectedCategory.guarenteedAverage.toPrecision(4)}` : "",
                "guarenteedAverage",
            )}
            {buildDisplayLabel(
                "Potential Average:",
                props.selectedCategory ? `${props.selectedCategory.potentialAverage.toPrecision(4)}` : "",
                "potentialAverage",
            )}
            <Grades>
                <ListControl
                    header={true}
                    headerText="Grades"
                    footer={true}
                    footerContent={
                        <Fragment>
                            <Button
                                tooltip="Create New Grade"
                                icon="add"
                                height={40}
                                width={60}
                                marginLeftRight={5}
                                onClick={handleNewGrade}
                            />
                            <Button
                                tooltip="Edit Selected Grade"
                                icon="create"
                                height={40}
                                width={60}
                                marginLeftRight={5}
                                onClick={handleEditGrade}
                            />
                            <Button
                                tooltip="Delete Selected Grade"
                                icon="delete"
                                height={40}
                                width={60}
                                marginLeftRight={5}
                                onClick={handleDeleteGrade}
                            />
                        </Fragment>
                    }
                    elements={getListElements()}
                    padding={10}
                    onRowClick={handleSelectGrade}
                />
            </Grades>
            <ReactModal
                style={{
                    overlay: {
                        background: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        height: "fit-content",
                        width: "40%",
                        left: "30%",
                    },
                }}
                isOpen={isCreating || isEditing}
                onRequestClose={handleCancel}
            >
                <ModalHeader
                    title="Grade Form"
                    exitModal={handleCancel}
                />
                <GradeFormModal
                    isCreating={isCreating}
                    gradeCategory={props.selectedCategory}
                    exitModal={handleCancel}
                    originalGrade={selectedGrade}
                    initialValues={selectedGrade && {
                        name: selectedGrade.name,
                        grade: selectedGrade.grade,
                    }}
                />
            </ReactModal>
        </GridContainer>
    );
    //#endregion

};

//#region Styles
const GridContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-column-gap: 10px;
    grid-template-columns: 1fr 2fr;
    grid-template-areas: "title list"
                         "percentage list"
                         "numberGrades list"
                         "gradesRemaining list"
                         "currentAverage list"
                         "guarenteedAverage list"
                         "potentialAverage list";
    @media screen and (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }
    margin-bottom: 10px;
`;

const LabelContainer = styled.div<{gridArea: string}>`
    padding: 10px;
    display: grid;
    grid-area: ${props => props.gridArea};
    grid-template-columns: auto 1fr;
    grid-template-areas: "label value";
`;

const PropLabel = styled.div`
    grid-area: label;
`;

const PropValue = styled.div`
    grid-area: value;
    display: flex;
    justify-content: flex-end;
`;

const Grades = styled.div`
    grid-area: list;
    min-height: 0;
`;
//#endregion

export default CategoryDetailedPane;
