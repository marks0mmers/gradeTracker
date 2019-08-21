import React, { Fragment, MouseEvent, useCallback} from "react";
import styled from "styled-components";
import { Course } from "../../../models/Course";
import { SetActiveCourseCreator } from "../../../state/ducks/control/courses";
import { DeleteCourseCreator } from "../../../state/ducks/data/courses";
import { useMapDispatch } from "../../../state/hooks";
import { leadingZeros } from "../../../util/General";
import Button from "../../../views/components/shared/Button";
import Divider from "../../components/shared/Divider";

interface Props {
    course: Course;

    onEditClick: (course?: Course) => void;
}

const CourseOverviewButton = (props: Props) => {

    //#region Prop Destructure
    const { onEditClick } = props;
    //#endregion

    //#region Redux State
    const actions = useMapDispatch({
        selectCourse: SetActiveCourseCreator,
        deleteCourse: DeleteCourseCreator,
    });
    //#endregion

    //#region Private Methods
    const handleClick = useCallback(() => {
        actions.selectCourse(props.course);
    }, [actions, props.course]);

    const handleEditClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onEditClick(props.course);
    }, [onEditClick, props.course]);

    const handleDelete = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete this course? (This cannot be undone)")) {
            actions.deleteCourse(props.course.id || "");
        }
    }, [actions, props.course.id]);
    //#endregion

    //#region Render Method
    return (
        <CourseOverviewButtonContainer
            id={`${props.course.title.toLowerCase()}-button`}
            onClick={handleClick}
        >
            <CourseInfo>
                <h1 className="value">{props.course.description}</h1>
                <Divider
                    isVertical={false}
                    gridArea="divider1"
                />
                <Label>
                    <span className="value">
                        {`Course: ${props.course.title} ${leadingZeros(3, props.course.section)}`}
                    </span>
                </Label>
                <Label>
                    <span className="value">{`Credit Hours: ${props.course.creditHours}`}</span>
                </Label>
                <Divider
                    isVertical={false}
                    gridArea="divider2"
                />
                <Buttons>
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
                </Buttons>
            </CourseInfo>
        </CourseOverviewButtonContainer>
    );
    //#endregion
};

//#region Styles
const CourseOverviewButtonContainer = styled.div`
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
`;

const CourseInfo = styled.div`
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

    .value {
        font-weight: normal;
        margin: auto 0;
        grid-area: description;
    }
`;

const Label = styled.div`
    font-weight: bold;
`;

const Buttons = styled.div`
    grid-area: buttons;
    display: flex;
    justify-content: flex-end;
`;
//#endregion

export default CourseOverviewButton;
