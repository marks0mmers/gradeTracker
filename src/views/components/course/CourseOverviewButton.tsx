import { Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { CourseOverviewMode } from "../../../constants/CourseOverviewMode";
import { Course } from "../../../models/Course";
import { CreateCourseFormChangeCreator, CreateCourseFormClearCreator } from "../../../state/ducks/control/courses";
import { CreateCourseCreator } from "../../../state/ducks/data/courses";
import Divider from "../../components/Divider";
import Button from "../../controls/button/package/Button";
import Input from "../styled-inputs/Input";

interface Props {
    className?: string;
    courseDescription?: string;
    courseTitle?: string;
    courseSection?: string;
    courseCreditHours?: number;
    mode?: CourseOverviewMode;
    formValues?: Map<string, string>;

    onFormChange?: typeof CreateCourseFormChangeCreator;
    onFormClear?: typeof CreateCourseFormClearCreator;
    onFormSubmit?: typeof CreateCourseCreator;
    onClick?: () => void;
    onHover?: (title: string) => void;
    cancelCreate?: () => void;
}

class CourseOverviewButton extends React.Component<Props> {

    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleHover = this.handleHover.bind(this);
    }

    public componentWillUnmount() {
        const handler = this.props.onFormClear;
        if (handler) {
            handler();
        }
    }

    public render() {
        const {
            className,
            courseDescription,
            courseTitle,
            courseSection,
            courseCreditHours,
            mode,
        } = this.props;

        return (
            <div
                id={`${courseTitle ? courseTitle.toLowerCase() : ""}-button`}
                className={className}
                onClick={this.handleClick}
                onMouseEnter={this.handleHover}
            >
                <div className="course-info">
                    {
                        mode === CourseOverviewMode.DISPLAY
                        ? <h1 className="value">{courseDescription}</h1>
                        : this.buildInput("description", "Course Description", "description", undefined, 30)
                    }
                    <Divider
                        isVertical={false}
                        gridArea="divider1"
                    />
                    <div className="label">
                        {
                            mode === CourseOverviewMode.DISPLAY
                            ? <span className="value">{`Course: ${courseTitle} ${courseSection}`}</span>
                            : <>
                                {this.buildInput("title", "Course (ABC-123)", "", 130, 20)}
                                {this.buildInput("section", "Section (123)", "", 95, 20)}
                            </>
                        }
                    </div>
                    <div className="label">
                        {
                            mode === CourseOverviewMode.DISPLAY
                            ? <span className="value">{`Credit Hours: ${courseCreditHours}`}</span>
                            : this.buildInput("hours", "Hours", "", 100, 20)
                        }
                    </div>
                    <Divider
                        isVertical={false}
                        gridArea="divider2"
                    />
                    <div className="buttons">
                        <span className="value">Course Actions: </span>
                        {
                            mode === CourseOverviewMode.DISPLAY
                            ? <>
                            <Button icon="create" size={40} />
                            <Button icon="delete_sweep" size={40} />
                            </>
                            : <>
                            <Button icon="clear" size={40} onClick={this.handleCancel}/>
                            <Button icon="save" size={40} onClick={this.handleExecute}/>
                            </>
                        }
                    </div>
                </div>
            </div>
        );
    }

    private handleClick() {
        const handler = this.props.onClick;
        if (handler) {
            handler();
        }
    }

    private handleHover() {
        const handler = this.props.onHover;
        const { courseTitle } = this.props;
        if (handler && courseTitle) {
            handler(courseTitle);
        }
    }

    private handleCancel() {
        const clear = this.props.onFormClear;
        if (clear) {
            clear();
        }
        const handler = this.props.cancelCreate;
        if (handler) {
            handler();
        }
    }

    private handleExecute() {
        const { formValues } = this.props;
        const handler = this.props.onFormSubmit;
        const course = new Course({
            creditHours: formValues && formValues.get("hours"),
            description: formValues && formValues.get("description"),
            section: formValues && formValues.get("section"),
            title: formValues && formValues.get("title"),
        });
        if (handler) {
            handler(course);
        }
        const clear = this.props.cancelCreate;
        if (clear) {
            clear();
        }
    }

    private buildInput(name: string, placeholder: string, gridArea: string, width?: number, height?: number) {
        const { formValues } = this.props;
        return (
            <Input
                name={name}
                height={height}
                width={width}
                placeholder={placeholder}
                value={formValues && formValues.get(name) || ""}
                onChange={this.handleInputChange}
                gridArea={gridArea}
            />
        );
    }

    private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const handler = this.props.onFormChange;
        const { target } = event;
        if (handler) {
            handler(target.name, target.value);
        }
    }
}

export default styled(CourseOverviewButton)`
    background: ${(props) => props.mode === CourseOverviewMode.DISPLAY ? props.theme.tertiary : props.theme.quinary}
    min-height: 135px;
    border: none;
    display: grid;
    grid-template-columns: 30px 1fr 30px;
    grid-template-areas: " . info . ";
    border-radius: 10px;
    margin: 10px;
    border: solid ${
        (props) => props.mode === CourseOverviewMode.DISPLAY
            ? props.theme.tertiary
            : props.theme.quinary
    } 2px;
    :hover {
        border: solid ${(props) => props.theme.tertiaryHover} 2px;
        cursor: pointer;
    }

    .course-info {
        background: ${(props) => props.theme.white};
        padding: 5px 10px;
        grid-area: info;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto 1px auto 1px auto;
        grid-row-gap: 5px;
        grid-template-areas: "description description"
                             "divider1 divider1"
                             "title section"
                             "divider2 divider2"
                             "buttons buttons";
    }

    .label {
        font-weight: bold;
    }

    .buttons {
        grid-area: buttons;
        display: flex;
        justify-content: flex-end;
    }

    .value {
        color: ${(props) => props.theme.primaryText};
        font-weight: normal;
        margin: auto 0;
        grid-area: description;
    }
`;
