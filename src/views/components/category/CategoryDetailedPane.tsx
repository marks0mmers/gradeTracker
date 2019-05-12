import React, { Fragment, useState } from "react";
import ReactModal from "react-modal";
import { useActions } from "src/state/hooks";
import styled from "styled-components";
import { Grade } from "../../../models/Grade";
import { GradeCategory } from "../../../models/GradeCategory";
import { DeleteGradeCreator } from "../../../state/ducks/data/gradeCategories";
import Button from "../../../views/controls/button/Button";
import { ListControlElement } from "../../controls/list-control/models/ListControlElement";
import ListControl from "../../controls/list-control/package/ListControl";
import ModalHeader from "../../modals/common/ModalHeader";
import GradeFormModal from "../../modals/GradeFormModal";

interface Props {
    className?: string;
    selectedCategory?: GradeCategory;
}

interface State {
    selectedGrade?: Grade;
    isCreating: boolean;
    isEditing: boolean;
}

const CategoryDetailedPane = (props: Props) => {

    const [state, setState] = useState<State>({
        isCreating: false,
        isEditing: false,
        selectedGrade: undefined,
    });

    const {deleteGrade} = useActions({deleteGrade: DeleteGradeCreator});

    const getListElements = () => {
        const { selectedCategory } = props;
        const { selectedGrade } = state;
        return selectedCategory && selectedCategory.grades.map((value: Grade) => {
            const element: ListControlElement = {
                isSelected: value === selectedGrade,
                primaryProperty: value.name,
                secondaryProperty: `${value.grade.toString()} %`,
            };
            return element;
        }).toList();
    };

    const handleCancel = () => {
        setState({
            isCreating: false,
            isEditing: false,
        });
    };

    const handleNewGrade = () => {
        const { selectedCategory } = props;
        if (selectedCategory && selectedCategory.numberOfGrades >= selectedCategory.grades.size + 1) {
            setState({
                isCreating: true,
                isEditing: false,
            });
        }
    };

    const handleEditGrade = () => {
        const { selectedGrade } = state;
        if (selectedGrade) {
            setState({
                isEditing: true,
                isCreating: false,
            });
        }
    };

    const handleDeleteGrade = () => {
        const { selectedGrade } = state;
        if (selectedGrade && props.selectedCategory) {
            deleteGrade(selectedGrade.id);
        }
    };

    const handleSelectGrade = (primaryProperty: string) => {
        const selectedGradeObject = props.selectedCategory && props.selectedCategory.grades.find(
            (g: Grade) => {
                return g.name === primaryProperty;
            },
        );
        setState({
            ...state,
            selectedGrade: selectedGradeObject,
        });
    };

    const buildDisplayLabel = (label: string, value: string | number, gridArea: string) => (
        <div className="label-container" style={{gridArea}}>
            <div className="prop-label">{label}</div>
            <div className="prop-value">{value}</div>
        </div>
    );

    return (
        <div className={props.className}>
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
            <div className="grades">
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
            </div>
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
                isOpen={state.isCreating || state.isEditing}
                onRequestClose={handleCancel}
            >
                <ModalHeader
                    title="Grade Form"
                    exitModal={handleCancel}
                />
                <GradeFormModal
                    isCreating={state.isCreating}
                    gradeCategory={props.selectedCategory}
                    exitModal={handleCancel}
                    originalGrade={state.selectedGrade}
                    initialValues={state.selectedGrade && {
                        name: state.selectedGrade.name,
                        grade: state.selectedGrade.grade,
                    }}
                />
            </ReactModal>
        </div>
    );

};

export default styled(CategoryDetailedPane)`
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

    .label-container {
        padding: 10px;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas: "label value";
    }

    .prop-label {
        grid-area: label;
    }

    .prop-value {
        grid-area: value;
        display: flex;
        justify-content: flex-end;
    }

    .grades {
        grid-area: list;
        min-height: 0;
    }

    .error {
        color: #b00020;
    }
`;
