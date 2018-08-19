import * as React from "react";
import styled from "styled-components";
import { Course } from "../../../models/Course";
import { GradeCategory } from "../../../models/GradeCategory";
import { AddGradeToCategoryCreator, DeleteGradeFromCategoryCreator } from "../../../state/ducks/data/courses";
import Button from "../../controls/button/package/Button";
import { ListControlElement } from "../../controls/list-control/models/ListControlElement";
import ListControl from "../../controls/list-control/package/ListControl";

interface Props {
    className?: string;
    selectedCategory?: string;
    course?: Course;
    categoryDidUpdate?: boolean;

    handleAddNewGrade?: typeof AddGradeToCategoryCreator;
    handleDeleteGrade?: typeof DeleteGradeFromCategoryCreator;
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
            course,
            selectedCategory,
        } = this.props;

        const {
            invalidGrade,
            selectedGrade,
            isEditing,
        } = this.state;

        const category = course && course.categories &&
            course.categories.find((value: GradeCategory) => value.title === selectedCategory);

        const elements = category && category.grades.map((value: number, key: string) => {
            const element: ListControlElement = {
                isEditing: key === selectedGrade && isEditing,
                isSelected: key === selectedGrade,
                primaryProperty: key,
                secondaryProperty: `${value.toString()} %`,
            };
            return element;
        }).toList();

        return (
            <div className={className}>
                {this.buildDisplayLabel("Category Name:", category ? category.title : "", "title")}
                {this.buildDisplayLabel("Percentage:", category ? `${category.percentage} %` : "", "percentage")}
                {this.buildDisplayLabel("Number of Grades:", category ? category.numberOfGrades : "", "numberGrades")}
                {this.buildDisplayLabel(
                    "Remaining Grades:", category
                        ? category.numberOfGrades - category.grades.size
                        : "",
                    "gradesRemaining",
                )}
                {this.buildDisplayLabel(
                    "Current Average:", category ? `${
                        (category.grades.reduce(
                            (total: number, value: number) => total + value, 0,
                        ) / category.grades.size).toPrecision(4)
                    } %` : "", "currentAverage",
                )}
                {this.buildDisplayLabel(
                    "Guarenteed Average:", category ? `${
                        (category.grades.reduce(
                            (total: number, value: number) => total + value, 0,
                        ) / category.numberOfGrades).toPrecision(4)
                    } %` : "", "guarenteedAverage",
                )}
                {this.buildDisplayLabel(
                    "Potential Average:", category ? `${
                        ((category.grades.reduce(
                            (total: number, value: number) => total + value, 0,
                        ) + ((category.numberOfGrades - category.grades.size) * 100))
                        / category.numberOfGrades).toPrecision(4)
                    } %` : "", "potentialAverage",
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
                                onClick={this.handleNewGrade}
                            />
                            <Button
                                tooltip="Edit Selected Grade"
                                icon="create"
                                height={40}
                                width={60}
                                onClick={this.handleEditGrade}
                            />
                            <Button
                                tooltip="Delete Selected Grade"
                                icon="delete"
                                height={40}
                                width={60}
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
        const { course, selectedCategory } = this.props;
        const category = course && course.categories &&
            course.categories.find((value: GradeCategory) => value.title === selectedCategory);
        if (category && category.numberOfGrades >= category.grades.size + 1) {
            this.setState({
                invalidGrade: false,
                isAddingGrade: true,
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
        const { selectedCategory, course } = this.props;
        const { selectedGrade } = this.state;
        if (selectedGrade) {
            const handler = this.props.handleDeleteGrade;
            if (handler && selectedCategory && course && course.title) {
                handler(course.title, selectedCategory, selectedGrade);
            }
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
            const { selectedCategory, course } = this.props;
            const handler = this.props.handleAddNewGrade;
            const category = course && course.categories &&
                course.categories.find((value: GradeCategory) => value.title === selectedCategory);
            const updatedCategory = new GradeCategory({
                currentAverage: category && category.currentAverage,
                grades: category && category.grades.set(description, parsedGrade),
                guarenteedAverage: category && category.guarenteedAverage,
                numberOfGrades: category && category.numberOfGrades,
                percentage: category && category.percentage,
                potentialAverage: category && category.potentialAverage,
                remainingGrades: category && category.remainingGrades,
                title: category && category.title,
            });
            if (handler && course && course.title) {
                handler(course.title, updatedCategory);
            }
            const deleteOld = this.props.handleDeleteGrade;
            if (
                deleteOld &&
                course &&
                course.title &&
                category &&
                category.title &&
                initialKey &&
                description !== initialKey
            ) {
                deleteOld(course.title, category.title, initialKey);
            }
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
        color: red;
    }
`;
