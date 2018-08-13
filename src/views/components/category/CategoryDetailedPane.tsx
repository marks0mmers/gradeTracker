import * as React from "react";
import styled from "styled-components";
import { GradeCategory } from "../../../models/GradeCategory";
import Button from "../../controls/button/package/Button";
import { ListControlElement } from "../../controls/list-control/models/ListControlElement";
import ListControl from "../../controls/list-control/package/ListControl";

interface Props {
    className?: string;
    category?: GradeCategory;
}

interface State {
    isAddingGrade: boolean;
}

class CategoryDetailedPane extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleNewGrade = this.handleNewGrade.bind(this);

        this.state = {
            isAddingGrade: false,
        };
    }

    public render() {
        const {
            className,
            category,
        } = this.props;

        const elements = category && category.grades.map((value: number, key: string) => {
            const element: ListControlElement = {
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
                <ListControl
                    header={true}
                    headerText="Grades"
                    footer={true}
                    footerContent={<Button
                        icon="add"
                        size={40}
                        onClick={this.handleNewGrade}
                    />}
                    showInputRow={this.state.isAddingGrade}
                    gridArea="list"
                    elements={elements}
                    margin={10}
                />
            </div>
        );
    }

    private handleNewGrade() {
        this.setState({
            isAddingGrade: true,
        });
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

    .list {
        grid-area: list;
    }
`;
