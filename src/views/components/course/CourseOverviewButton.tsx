import { Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { CourseOverviewMode } from "../../../constants/CourseOverviewMode";
import { Course } from "../../../models/Course";
import { DeleteCourseCreator } from "../../../state/ducks/data/courses";
import Divider from "../../components/Divider";
import Button from "../../controls/button/package/Button";
import Input from "../styled-inputs/Input";

interface Props {
    className?: string;
    courseDescription?: string;
    courseTitle?: string;
    courseSection?: string;
    courseCreditHours?: number;
    originalCourse?: Course;
    mode?: CourseOverviewMode;

    onDeleteClick?: typeof DeleteCourseCreator;
    onEditClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onFormSubmit?: (course: Course) => void;
    onClick?: () => void;
    onHover?: (title: string) => void;
    cancelCreate?: () => void;
}

interface State {
    formValues: Map<string, string>;
}

class CourseOverviewButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            formValues: props.originalCourse
            ? Map<string, string>()
                .set("description", props.originalCourse.description)
                .set("title", props.originalCourse.title)
                .set("section", props.originalCourse.section)
                .set("hours", String(props.originalCourse.creditHours))
            : Map(),
        };
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
                            <Button
                                tooltip="Edit Course"
                                icon="create"
                                height={40}
                                width={60}
                                onClick={this.props.onEditClick}
                            />
                            <Button
                                tooltip="Delete Course"
                                id="delete_course"
                                icon="delete_sweep"
                                height={40}
                                width={60}
                                onClick={this.handleDelete}
                            />
                            </>
                            : <>
                            <Button
                                tooltip="Cancel"
                                icon="clear"
                                height={40}
                                width={60}
                                onClick={this.handleCancel}
                            />
                            <Button
                                tooltip="Save"
                                icon="save"
                                height={40}
                                width={60}
                                onClick={this.handleExecute}
                            />
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

    private handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        const { courseTitle } = this.props;
        const handler = this.props.onDeleteClick;
        if (handler && courseTitle) {
            handler(courseTitle);
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
        this.setState({
            formValues: Map(),
        });
        const handler = this.props.cancelCreate;
        if (handler) {
            handler();
        }
    }

    private handleExecute() {
        const { originalCourse } = this.props;
        const { formValues } = this.state;
        const handler = this.props.onFormSubmit;
        const course = new Course({
            categories: originalCourse && originalCourse.categories,
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
        const { formValues } = this.state;
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
        const { name, value } = event.target;
        const { formValues } = this.state;
        this.setState({
            formValues: formValues.set(name, value),
        });
    }
}

export default styled(CourseOverviewButton)`
    background: ${(props) => props.mode === CourseOverviewMode.DISPLAY
        ? props.theme.tertiary
        : props.theme.tertiaryActive};
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
            : props.theme.tertiaryActive
    } 2px;
    :hover {
        border: solid ${(props) => props.mode === CourseOverviewMode.DISPLAY
            ? props.theme.tertiaryHover
            : props.theme.tertiaryActive} 2px;
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
