import React, { Fragment, MouseEvent} from "react";
import styled from "styled-components";
import { Course } from "../../../models/Course";
import { leadingZeros } from "../../../util/General";
import Button from "../../../views/controls/button/Button";
import Divider from "../../components/Divider";

interface Props {
    className?: string;
    course: Course;

    onClick: (course?: Course) => void;
    onEditClick: (course?: Course) => void;
    onDeleteClick: (id: string) => void;
}

const CourseOverviewButton = (props: Props) => {

    const handleClick = () => {
        const { onClick, course } = props;
        onClick(course);
    };

    const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const { onEditClick, course } = props;
        onEditClick(course);
    };

    const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (confirm("Are you sure you want to delete this course? (This cannot be undone)")) {
            const { onDeleteClick, course } = props;
            onDeleteClick(course.id || "");
        }
    };

    return (
        <div
            id={`${props.course.title.toLowerCase()}-button`}
            className={props.className}
            onClick={handleClick}
        >
            <div className="course-info">
                <h1 className="value">{props.course.description}</h1>
                <Divider
                    isVertical={false}
                    gridArea="divider1"
                />
                <div className="label">
                    <span className="value">
                        {`Course: ${props.course.title} ${leadingZeros(3, props.course.section)}`}
                    </span>
                </div>
                <div className="label">
                    <span className="value">{`Credit Hours: ${props.course.creditHours}`}</span>
                </div>
                <Divider
                    isVertical={false}
                    gridArea="divider2"
                />
                <div className="buttons">
                    <span className="value">Course Actions: </span>
                    <Fragment>
                        <Button
                            tooltip="Edit Course"
                            icon="create"
                            height={40}
                            width={60}
                            marginLeftRight={5}
                            onClick={handleEditClick}
                        />
                        <Button
                            tooltip="Delete Course"
                            id="delete_course"
                            icon="delete_sweep"
                            height={40}
                            width={60}
                            marginLeftRight={5}
                            onClick={handleDelete}
                        />
                    </Fragment>
                </div>
            </div>
        </div>
    );
};

export default styled(CourseOverviewButton)`
    background: #86b3d1;
    min-height: 135px;
    border: none;
    display: grid;
    grid-template-columns: 30px 1fr 30px;
    grid-template-areas: " . info . ";
    border-radius: 10px;
    margin: 10px;
    border: solid #86b3d1 2px;
    :hover {
        border: solid #8bb9d9 2px;
        cursor: pointer;
    }

    .course-info {
        background: white;
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
        font-weight: normal;
        margin: auto 0;
        grid-area: description;
    }
`;
