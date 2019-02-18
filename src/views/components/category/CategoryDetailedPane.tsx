import { Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Grade } from "../../../models/Grade";
import { GradeCategory } from "../../../models/GradeCategory";
import Button from "../../controls/button/package/Button";
import { ListControlElement } from "../../controls/list-control/models/ListControlElement";
import ListControl from "../../controls/list-control/package/ListControl";

interface Props {
    className?: string;
    selectedCategory?: GradeCategory;
    grades?: Map<string, Grade>;
    categoryDidUpdate?: boolean;
}

interface State {
    selectedGrade?: string;
    isAddingGrade: boolean;
    invalidGrade: boolean;
    isEditing: boolean;
}

class CategoryDetailedPane extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleNewGrade = this.handleNewGrade.bind(this);
        this.handleSaveGrade = this.handleSaveGrade.bind(this);
        this.handleDeleteGrade = this.handleDeleteGrade.bind(this);
        this.handleSelectGrade = this.handleSelectGrade.bind(this);
        this.handleEditGrade = this.handleEditGrade.bind(this);
        this.handleCancelModify = this.handleCancelModify.bind(this);

        this.state = {
            invalidGrade: false,
            isAddingGrade: false,
            isEditing: false,
            selectedGrade: undefined,
        };
    }

    public render() {
        const {
            className,
            grades,
            selectedCategory,
        } = this.props;

        const {
            invalidGrade,
            selectedGrade,
            isEditing,
        } = this.state;

        const elements = grades && grades.map((value: Grade, key: string) => {
            const element: ListControlElement = {
                isEditing: key === selectedGrade && isEditing,
                isSelected: key === selectedGrade,
                primaryProperty: value.name,
                secondaryProperty: `${value.grade.toString()} %`,
            };
            return element;
        }).toList();
        const numberOfGradesOrSize = selectedCategory && selectedCategory.numberOfGrades;
        return (
            <div className={className}>
                {this.buildDisplayLabel("Category Name:", selectedCategory ? selectedCategory.title : "", "title")}
                {this.buildDisplayLabel(
                    "Percentage:",
                    selectedCategory ? `${selectedCategory.percentage} %` : "",
                    "percentage",
                )}
                {this.buildDisplayLabel(
                    "Number of Grades:",
                    grades ? grades.size : "",
                    "numberGrades",
                    )}
                {this.buildDisplayLabel(
                    "Remaining Grades:",
                    grades && numberOfGradesOrSize ? numberOfGradesOrSize - grades.size : "",
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
                    {invalidGrade && <span className="error">Invalid Grade</span>}
                    <ListControl
                        header={true}
                        headerText="Grades"
                        footer={true}
                        footerContent={
                            <>
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
                            </>
                        }
                        showInputRow={this.state.isAddingGrade}
                        onRowSave={this.handleSaveGrade}
                        elements={elements}
                        padding={10}
                        primaryPlaceHolder="Grade Name"
                        secondaryPlaceHolder="Grade (NO % SIGN)"
                        onRowClick={this.handleSelectGrade}
                        onRowClear={this.handleCancelModify}
                    />
                </div>
            </div>
        );
    }

    private handleCancelModify() {
        this.setState({
            invalidGrade: false,
            isAddingGrade: false,
            isEditing: false,
        });
    }

    private handleNewGrade() {
        const { grades, selectedCategory } = this.props;
        if (selectedCategory && grades && selectedCategory.numberOfGrades >= grades.size + 1) {
            this.setState({
                invalidGrade: false,
                isAddingGrade: true,
            });
        } else {
            this.setState({
                invalidGrade: false,
                isAddingGrade: false,
            });
        }
    }

    private handleEditGrade() {
        const { selectedGrade } = this.state;
        if (selectedGrade) {
            this.setState({
                invalidGrade: false,
                isEditing: true,
            });
        }
    }

    private handleDeleteGrade() {
        const { selectedGrade } = this.state;
        if (selectedGrade) {
            // rewrite this
        }
    }

    private handleSelectGrade(primaryProperty: string) {
        this.setState({
            selectedGrade: primaryProperty,
        });
    }

    private handleSaveGrade(description: string, grade?: string, initialKey?: string) {
        const parsedGrade = (!grade || isNaN(+grade)) ? -1 : +grade;
        if (parsedGrade >= 0) {
            this.setState({
                invalidGrade: false,
                isAddingGrade: false,
                isEditing: false,
            });

            // TODO rewrite this

        } else {
            this.setState({
                invalidGrade: true,
            });
        }
    }

    private buildDisplayLabel(label: string, value: string | number, gridArea: string) {
        return (
            <div className="label-container" style={{gridArea}}>
                <div className="prop-label">{label}</div>
                <div className="prop-value">{value}</div>
            </div>
        );
    }
}

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
    background: ${(props) => props.theme.hover};
    margin-bottom: 10px;

    .label-container {
        padding: 10px;
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas: "label value";
    }

    .prop-label {
        color: ${(props) => props.theme.primaryText};
        grid-area: label;
    }

    .prop-value {
        grid-area: value;
        display: flex;
        justify-content: flex-end;
        color: ${(props) => props.theme.primaryText};
    }

    .grades {
        grid-area: list;
        min-height: 0;
    }

    .error {
        color: ${(props) => props.theme.error};
    }
`;
