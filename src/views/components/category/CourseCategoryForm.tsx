import { Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Course } from "../../../models/Course";
import { GradeCategory } from "../../../models/GradeCategory";
import { CreateCategoryFormChangeCreator } from "../../../state/ducks/control/courses";
import { CreateCategoryCreator } from "../../../state/ducks/data/courses";
import Button from "../../controls/button/package/Button";
import Input from "../styled-inputs/Input";

interface Props {
    className?: string;
    formValues?: Map<string, string>;
    course?: Course;

    handleFormChange?: typeof CreateCategoryFormChangeCreator;
    handleFormSave?: typeof CreateCategoryCreator;
    handleCancelCreate?: () => void;
}

interface State {
    isInvalidInput?: boolean;
}

class CourseCategoryForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            isInvalidInput: false,
        };
    }

    public render() {
        const {
            className,
        } = this.props;

        const {
            isInvalidInput,
        } = this.state;

        return (
            <>
            <div className={className}>
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
                    width={50}
                    height={30}
                    icon="clear"
                    onClick={this.props.handleCancelCreate}
                />
                <Button
                    width={50}
                    height={30}
                    icon="save"
                    onClick={this.handleSave}
                />
            </div>
            {isInvalidInput && <span className="error">Invalid Numerical Value</span>}
            </>
        );
    }

    private buildInput(name: string, width?: number, height?: number) {
        const { formValues } = this.props;
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

    private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        const handler = this.props.handleFormChange;
        if (handler) {
            handler(name, value);
        }
    }

    private handleSave() {
        const handler = this.props.handleFormSave;
        const { course, formValues } = this.props;
        if (formValues) {
            const numberOfGrades = !isNaN(+formValues.get("numberOfGrades")) && +formValues.get("numberOfGrades");
            const percentage = !isNaN(+formValues.get("percentage")) && +formValues.get("percentage");
            const title: string | undefined = formValues.get("name", undefined);
            if (numberOfGrades && percentage && name) {
                this.setState({
                    isInvalidInput: false,
                });
                const category = new GradeCategory({
                    grades: Map(),
                    numberOfGrades,
                    percentage,
                    title,
                });
                if (course && handler) {
                    handler(course, category);
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
        color: ${(props) => props.theme.primaryText};
        margin-right: 10px;
    }

    .error {
        color: red;
    }
`;
