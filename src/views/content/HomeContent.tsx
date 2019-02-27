import { push } from "connected-react-router";
import { Map } from "immutable";
import * as React from "react";
import { User } from "src/models/User";
import styled from "styled-components";
import { CourseOverviewMode } from "../../constants/CourseOverviewMode";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import {
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import { CreateNewCourseCreator, DeleteCourseCreator, EditCourseCreator } from "../../state/ducks/data/courses";
import CourseOverviewButton from "../components/course/CourseOverviewButton";
import Divider from "../components/Divider";
import Button from "../controls/button/package/Button";
import { ButtonWrapper } from "../wrappers/ButtonWrapper";

interface Props {
    className?: string;
    courses?: Map<string, Course>;
    selectedGradeCategory?: GradeCategory;
    currentUser?: User;

    handleSetActiveCourse?: typeof SetActiveCourseCreator;
    handleCreateNewCourse?: typeof CreateNewCourseCreator;
    handleEditCourse?: typeof EditCourseCreator;
    handleDeleteCourse?: typeof DeleteCourseCreator;
    push?: typeof push;
}

interface State {
    isCreating?: boolean;
    isEditing?: boolean;
    editingCourse?: Course;
}

class HomeContent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleCourseClick = this.handleCourseClick.bind(this);
        this.handleNewCourseClick = this.handleNewCourseClick.bind(this);
        this.handleNewCourseCancel = this.handleNewCourseCancel.bind(this);
        this.handleCourseSave = this.handleCourseSave.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);

        this.state = {
            isCreating: false,
            isEditing: false,
            editingCourse: undefined,
        };
    }

    public render() {
        const {
            className,
            courses,
        } = this.props;

        const {
            isCreating,
            isEditing,
            editingCourse,
        } = this.state;

        return (
            <div id="home-content" className={className}>
                <h2
                    className="route"
                >
                    Courses
                </h2>
                <ButtonWrapper id="button-wrapper">
                    {
                        !isCreating &&
                        <>
                        <span className="button-label">Create New Course:</span>
                        <Button
                            id="create-new-course"
                            tooltip="Create New Course"
                            icon="add"
                            height={30}
                            width={50}
                            marginLeftRight={5}
                            onClick={this.handleNewCourseClick}
                        />
                        </>
                    }
                </ButtonWrapper>
                <Divider isVertical={false} gridArea="divider"/>
                <div className="content">
                    {
                        isCreating &&
                        <CourseOverviewButton
                            mode={CourseOverviewMode.INPUT}
                            courseId={""}
                            cancelCreate={this.handleNewCourseCancel}
                            onFormSubmit={this.handleCourseSave}
                        />
                    }
                    {
                        isEditing &&
                        <CourseOverviewButton
                            mode={CourseOverviewMode.INPUT}
                            courseId={editingCourse && editingCourse.id || ""}
                            originalCourse={editingCourse && editingCourse}
                            cancelCreate={this.handleNewCourseCancel}
                            onFormSubmit={this.handleCourseSave}
                        />
                    }
                    {
                        courses && courses.reverse().map((course: Course, key: string) => {
                            return isEditing && editingCourse === course
                            ? null
                            : (
                                <CourseOverviewButton
                                    key={key}
                                    mode={CourseOverviewMode.DISPLAY}
                                    courseId={course.id || ""}
                                    originalCourse={course}
                                    courseCreditHours={course.creditHours}
                                    courseDescription={course.description}
                                    courseSection={course.section}
                                    courseTitle={course.title}
                                    onClick={this.handleCourseClick}
                                    onDeleteClick={this.handleDeleteClick}
                                    onEditClick={this.handleEditClick}
                                />
                            );
                        }).toList()
                    }
                </div>
            </div>
        );
    }

    private handleDeleteClick(id: string) {
        const handler = this.props.handleDeleteCourse;
        if (handler) {
            handler(id);
        }
    }

    private handleEditClick(event: React.MouseEvent<HTMLButtonElement>, course?: Course) {
        event.stopPropagation();
        this.setState({
            isCreating: false,
            isEditing: true,
            editingCourse: course,
        });
    }

    private handleCourseSave(course: Course, originalCourse?: Course) {
        const { currentUser } = this.props;
        const { isCreating, isEditing } = this.state;
        if (isCreating) {
            const handler = this.props.handleCreateNewCourse;
            if (handler) {
                handler(course.set("userId", currentUser ? currentUser._id : "") as Course);
            }
        }
        if (isEditing) {
            const handler = this.props.handleEditCourse;
            if (handler) {
                handler(course);
            }
        }
    }

    private handleCourseClick(course?: Course) {
        const handler = this.props.handleSetActiveCourse;
        if (handler && course) {
            handler(course);
        }
    }

    private handleNewCourseClick() {
        this.setState({
            isCreating: true,
            isEditing: false,
        });
    }

    private handleNewCourseCancel() {
        this.setState({
            isCreating: false,
            isEditing: false,
        });
    }

}

export default styled(HomeContent)`
    display: grid;
    background: ${(props) => props.theme.white};
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto 1fr;
    grid-template-areas: "subheader buttons"
                         "divider divider"
                         "content content";
    overflow-y: scroll;

    .route {
        padding: 10px;
        margin-left: 10px;
        color: ${(props) => props.theme.primaryText};
        cursor: default;
    }

    .content {
        grid-area: content;
    }

    .sub-header {
        display: flex;
        justify-content: space-between;
        min-height: fit-content;
    }

    .button-label {
        margin: auto 0;
        color: ${(props) => props.theme.primaryText}
    }
`;
