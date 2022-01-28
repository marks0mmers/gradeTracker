import { MouseEvent, useCallback} from "react";
import styled from "styled-components";
import { Course } from "../../../models/Course";
import { SetActiveCourseCreator } from "../../../state/ducks/control/courses";
import { DeleteCourseCreator } from "../../../state/ducks/data/courses";
import { useMapDispatch } from "../../../state/hooks";
import { leadingZeros } from "../../../util/General";
import Button from "../../../views/components/shared/Button";
import Divider from "../../components/shared/Divider";
import { useHistory } from "react-router";

interface Props {
    course: Course;

    onEditClick: (course?: Course) => void;
}

const CourseOverviewButton = ({onEditClick, ...props}: Props) => {
    const { push } = useHistory();

    const dispatch = useMapDispatch({
        selectCourse: SetActiveCourseCreator,
        deleteCourse: DeleteCourseCreator,
    });

    const handleClick = useCallback(() => {
        dispatch.selectCourse(props.course);
        push(`/course/${props.course.title}`);
    }, [push, dispatch, props.course]);

    const handleEditClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onEditClick(props.course);
    }, [onEditClick, props.course]);

    const handleDelete = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete this course? (This cannot be undone)")) {
            dispatch.deleteCourse(props.course.id || "");
        }
    }, [dispatch, props.course.id]);

    return (
        <CourseOverviewButtonContainer
            id={`${props.course.title.toLowerCase()}-button`}
            onClick={handleClick}
        >
            <CourseInfo id="course-info">
                <h1 className="value">{props.course.description}</h1>
                <Divider
                    id="divider"
                    isVertical={false}
                    gridArea="divider1"
                />
                <Label id="label">
                    <span className="value">
                        {`Course: ${props.course.title} ${leadingZeros(3, props.course.section)}`}
                    </span>
                </Label>
                <Label id="label">
                    <span className="value">{`Credit Hours: ${props.course.creditHours}`}</span>
                </Label>
                <Divider
                    id="divider"
                    isVertical={false}
                    gridArea="divider2"
                />
                <Buttons id="buttons-container">
                    <span className="value">Course Actions: </span>
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
                </Buttons>
            </CourseInfo>
        </CourseOverviewButtonContainer>
    );
};

const CourseOverviewButtonContainer = styled.div`
    background: #86b3d1;
    min-height: 135px;
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

export default CourseOverviewButton;
