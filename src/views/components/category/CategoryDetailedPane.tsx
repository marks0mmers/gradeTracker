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
}

class CategoryDetailedPane extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleNewGrade = this.handleNewGrade.bind(this);
        this.handleSaveNewGrade = this.handleSaveNewGrade.bind(this);
        this.handleDeleteGrade = this.handleDeleteGrade.bind(this);
        this.handleSelectGrade = this.handleSelectGrade.bind(this);

        this.state = {
            invalidGrade: false,
            isAddingGrade: false,
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
        } = this.state;

        const category = course && course.categories &&
            course.categories.find((value: GradeCategory) => value.title === selectedCategory);

        const elements = category && category.grades.map((value: number, key: string) => {
            const element: ListControlElement = {
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
                    "Remaining Grades:", category ? category.remainingGrades : "", "gradesRemaining",
                )}
                {this.buildDisplayLabel(
                    "Current Average:", category ? `${category.currentAverage} %` : "", "currentAverage",
                )}
                {this.buildDisplayLabel(
                    "Guarenteed Average:", category ? `${category.guarenteedAverage} %` : "", "guarenteedAverage",
                )}
                {this.buildDisplayLabel(
                    "Potential Average:", category ? `${category.potentialAverage} π%` : "", "potentialAverage",
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
                                icon="delete"
                                height={40}
                                width={60}
                                onClick={this.handleDeleteGrade}
                            />
                            <Button
                                icon="add"
                                height={40}
                                width={60}
                                onClick={this.handleNewGrade}
                            />
                            </>
                        }
                        showInputRow={this.state.isAddingGrade}
                        onRowSave={this.handleSaveNewGrade}
                        elements={elements}
                        margin={10}
                        onRowClick={this.handleSelectGrade}
                    />
                </div>
            </div>
        );
    }

    private handleNewGrade() {
        this.setState({
            isAddingGrade: true,
        });
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

    private handleSaveNewGrade(description: string, grade?: string) {
        const parsedGrade = (!grade || isNaN(+grade)) ? -1 : +grade;
        if (parsedGrade >= 0) {
            this.setState({
                invalidGrade: false,
                isAddingGrade: false,
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
    grid-template-columns: 1fr 2fr;
    grid-auto-rows: 40px;
    grid-template-areas: "title list"
                         "percentage list"
                         "numberGrades list"
                         "gradesRemaining list"
                         "currentAverage list"
                         "guarenteedAverage list"
                         "potentialAverage list";
    grid-column-gap: 10px;
    background: ${(props) => props.theme.hover};

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
    }

    .error {
        color: red;
    }
`;
