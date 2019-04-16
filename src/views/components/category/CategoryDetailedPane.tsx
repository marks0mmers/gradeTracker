import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { DeleteGradeCreator } from "src/state/ducks/data/gradeCategories";
import ModalHeader from "src/views/modals/common/ModalHeader";
import GradeFormModal from "src/views/modals/GradeFormModal";
import styled from "styled-components";
import { Grade } from "../../../models/Grade";
import { GradeCategory } from "../../../models/GradeCategory";
import Button from "../../../views/controls/button/Button";
import { ListControlElement } from "../../controls/list-control/models/ListControlElement";
import ListControl from "../../controls/list-control/package/ListControl";

interface PassedProps {
    className?: string;
    selectedCategory?: GradeCategory;
}

interface PropsFromDispatch {
    handleDeleteGrade: typeof DeleteGradeCreator;
}

type Props = PassedProps & PropsFromDispatch;

interface State {
    selectedGrade?: string;
    isCreating: boolean;
    isEditing: boolean;
}

class CategoryDetailedPane extends Component<Props, State> {

    public readonly state = {
        isCreating: false,
        isEditing: false,
        selectedGrade: undefined,
    };

    public render() {
        const {
            className,
            selectedCategory,
        } = this.props;

        const selectedGrade = selectedCategory && selectedCategory.grades.find(
            (g: Grade) => g.name === this.state.selectedGrade,
        );

        return (
            <div className={className}>
                {this.buildDisplayLabel(
                    "Category Name:",
                    selectedCategory ? selectedCategory.title : "",
                    "title",
                )}
                {this.buildDisplayLabel(
                    "Percentage:",
                    selectedCategory ? `${selectedCategory.percentage} %` : "",
                    "percentage",
                )}
                {this.buildDisplayLabel(
                    "Number of Grades:",
                    selectedCategory ? selectedCategory.numberOfGrades : "",
                    "numberGrades",
                    )}
                {this.buildDisplayLabel(
                    "Remaining Grades:",
                    selectedCategory ? selectedCategory.remainingGrades : "",
                    "gradesRemaining",
                )}
                {this.buildDisplayLabel(
                    "Current Average:",
                    selectedCategory ? `${selectedCategory.currentAverage.toPrecision(4)}` : "",
                    "currentAverage",
                )}
                {this.buildDisplayLabel(
                    "Guarenteed Average:",
                    selectedCategory ? `${selectedCategory.guarenteedAverage.toPrecision(4)}` : "",
                    "guarenteedAverage",
                )}
                {this.buildDisplayLabel(
                    "Potential Average:",
                    selectedCategory ? `${selectedCategory.potentialAverage.toPrecision(4)}` : "",
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
                                    onClick={this.handleNewGrade}
                                />
                                <Button
                                    tooltip="Edit Selected Grade"
                                    icon="create"
                                    height={40}
                                    width={60}
                                    marginLeftRight={5}
                                    onClick={this.handleEditGrade}
                                />
                                <Button
                                    tooltip="Delete Selected Grade"
                                    icon="delete"
                                    height={40}
                                    width={60}
                                    marginLeftRight={5}
                                    onClick={this.handleDeleteGrade}
                                />
                            </Fragment>
                        }
                        elements={this.getListElements()}
                        padding={10}
                        onRowClick={this.handleSelectGrade}
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
                    isOpen={this.state.isCreating || this.state.isEditing}
                    onRequestClose={this.handleCancel}
                >
                    <ModalHeader
                        title="Grade Form"
                        exitModal={this.handleCancel}
                    />
                    <GradeFormModal
                        isCreating={this.state.isCreating}
                        gradeCategory={selectedCategory}
                        exitModal={this.handleCancel}
                        originalGrade={selectedGrade}
                        initialValues={selectedGrade && {
                            name: selectedGrade.name,
                            grade: selectedGrade.grade,
                        }}
                    />
                </ReactModal>
            </div>
        );
    }

    private getListElements = () => {
        const { selectedCategory } = this.props;
        const { selectedGrade } = this.state;
        return selectedCategory && selectedCategory.grades.map((value: Grade) => {
            const element: ListControlElement = {
                isSelected: value.name === selectedGrade,
                primaryProperty: value.name,
                secondaryProperty: `${value.grade.toString()} %`,
            };
            return element;
        }).toList();
    }

    private handleCancel = () => {
        this.setState({
            isCreating: false,
            isEditing: false,
        });
    }

    private handleNewGrade = () => {
        const { selectedCategory } = this.props;
        if (selectedCategory && selectedCategory.numberOfGrades >= selectedCategory.grades.size + 1) {
            this.setState({
                isCreating: true,
            });
        }
    }

    private handleEditGrade = () => {
        const { selectedGrade } = this.state;
        if (selectedGrade) {
            this.setState({
                isEditing: true,
                isCreating: false,
            });
        }
    }

    private handleDeleteGrade = () => {
        const { selectedGrade } = this.state;
        if (selectedGrade && this.props.selectedCategory) {
            const grade = this.props.selectedCategory.grades.find((g: Grade) => g.name === selectedGrade);
            this.props.handleDeleteGrade(grade.id);
        }
    }

    private handleSelectGrade = (primaryProperty: string) => {
        this.setState({
            selectedGrade: primaryProperty,
        });
    }

    private buildDisplayLabel = (label: string, value: string | number, gridArea: string) => (
        <div className="label-container" style={{gridArea}}>
            <div className="prop-label">{label}</div>
            <div className="prop-value">{value}</div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        handleDeleteGrade: DeleteGradeCreator,
    }, dispatch);
};

const Styled =  styled(CategoryDetailedPane)`
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

export default connect(null, mapDispatchToProps)(Styled);
