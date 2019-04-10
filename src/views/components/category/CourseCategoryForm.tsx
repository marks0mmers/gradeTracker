import { Map } from "immutable";
import React, { ChangeEvent, Component } from "react";
import styled from "styled-components";
import { Course } from "../../../models/Course";
import { Grade } from "../../../models/Grade";
import { GradeCategory } from "../../../models/GradeCategory";
import Button from "../../../views/controls/button/Button";
import Input from "../styled-inputs/Input";

interface Props {
    className?: string;
    course?: Course;
    originalCategory?: GradeCategory;
    categoryGrades?: Map<string, Grade>;

    handleFormChange?: (name: string, value: string) => void;
    handleFormSave: (course: Course, category: GradeCategory) => void;
    handleCancelCreate: () => void;
}

interface State {
    isInvalidInput?: boolean;
    formValues: Map<string, string>;
}

class CourseCategoryForm extends Component<Props, State> {

    public readonly state = {
        formValues: this.props.originalCategory
            ? Map<string, string>()
                .set("name", this.props.originalCategory.title)
                .set("percentage", String(this.props.originalCategory.percentage))
                .set("numberOfGrades", String(this.props.originalCategory.numberOfGrades))
            : Map<string, string>(),
        isInvalidInput: false,
    };

    public render() {
        return (
            <div>
                <div className={this.props.className}>
                    <div className="form-input">
                        <span className="label">Category Name:</span>
                        {this.buildInput("name", 300, 20)}
                    </div>
                    <div className="form-input">
                        <span className="label">Percentage:</span>
                        {this.buildInput("percentage", 100, 20)}
                    </div>
                    <div className="form-input">
                        <span className="label">Number of Grades:</span>
                        {this.buildInput("numberOfGrades", 100, 20)}
                    </div>
                    <Button
                        tooltip="Cancel"
                        width={50}
                        height={30}
                        marginLeftRight={5}
                        icon="clear"
                        onClick={this.props.handleCancelCreate}
                    />
                    <Button
                        tooltip="Save"
                        width={50}
                        height={30}
                        marginLeftRight={5}
                        icon="save"
                        onClick={this.handleSave}
                    />
                </div>
                {
                    this.state.isInvalidInput && <span className="error">Invalid Numerical Value</span>
                }
            </div>
        );
    }

    private buildInput = (name: string, width?: number, height?: number) => {
        const { formValues } = this.state;
        return (
            <Input
                name={name}
                height={height}
                width={width}
                value={formValues && formValues.get(name) || ""}
                onChange={this.handleInputChange}
            />
        );
    }

    private handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const { formValues } = this.state;
        this.setState({
            formValues: formValues.set(name, value),
        });
    }

    private handleSave = () => {
        const { course, originalCategory, handleFormSave } = this.props;
        const { formValues } = this.state;
        if (formValues) {
            const numberOfGrades = !isNaN(+formValues.get("numberOfGrades")) && +formValues.get("numberOfGrades");
            const percentage = !isNaN(+formValues.get("percentage")) && +formValues.get("percentage");
            const title = formValues.get("name", undefined);
            const isNumGradesValid = originalCategory && this.props.categoryGrades && typeof numberOfGrades === "number"
                ? (numberOfGrades || 0) >= this.props.categoryGrades.size
                : true;
            if (numberOfGrades && percentage && title && isNumGradesValid) {
                this.setState({
                    isInvalidInput: false,
                });
                const category = new GradeCategory({
                    grades: Map(),
                    numberOfGrades,
                    percentage,
                    title,
                    ...(originalCategory ? originalCategory.toJS() : {}),
                });
                if (course ) {
                    handleFormSave(course, category);
                }
                const clear = this.props.handleCancelCreate;
                if (clear) {
                    clear();
                }
            } else {
                this.setState({
                    isInvalidInput: true,
                });
            }
        }
    }
}

export default styled(CourseCategoryForm)`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto auto;
    grid-template-rows: 40px;

    .form-input {
        display: inline-block;
        margin: auto 0;
    }

    .label {
        margin-right: 10px;
    }

    .error {
        color: #b00020;
    }
`;
