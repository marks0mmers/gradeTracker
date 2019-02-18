import { push } from "connected-react-router";
import { Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { CourseOverviewMode } from "../../constants/CourseOverviewMode";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import {
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import { CreateNewCourseCreator } from "../../state/ducks/data/courses";
import CourseOverviewButton from "../components/course/CourseOverviewButton";
import Divider from "../components/Divider";
import Button from "../controls/button/package/Button";
import { ButtonWrapper } from "../wrappers/ButtonWrapper";

interface Props {
    className?: string;
    courses?: Map<string, Course>;
    detailedCourse?: string;
    selectedGradeCategory?: GradeCategory;

    handleSetActiveCourse?: typeof SetActiveCourseCreator;
    handleCreateNewCourse?: typeof CreateNewCourseCreator;
    push?: typeof push;
}

interface State {
    isCreating?: boolean;
    isEditing?: boolean;
}

class HomePage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleViewCourseDetailed = this.handleViewCourseDetailed.bind(this);
        this.handleNewCourseClick = this.handleNewCourseClick.bind(this);
        this.handleNewCourseCancel = this.handleNewCourseCancel.bind(this);
        this.handleCourseHover = this.handleCourseHover.bind(this);
        this.handleCourseSave = this.handleCourseSave.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);

        this.state = {
            isCreating: false,
            isEditing: false,
        };
    }

    public render() {
        const {
            className,
            courses,
            detailedCourse,
        } = this.props;

        const {
            isCreating,
            isEditing,
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
                            cancelCreate={this.handleNewCourseCancel}
                            onFormSubmit={this.handleCourseSave}
                        />
                    }
                    {
                        isEditing &&
                        <CourseOverviewButton
                            mode={CourseOverviewMode.INPUT}
                            originalCourse={courses && courses.find((value: Course) => value.title === detailedCourse)}
                            cancelCreate={this.handleNewCourseCancel}
                            onFormSubmit={this.handleCourseSave}
                        />
                    }
                    {
                        courses && courses.reverse().map((course: Course, key: string) => {
                            return isEditing && detailedCourse === course.title
                            ? null
                            : (
                                <CourseOverviewButton
                                    key={key}
                                    mode={CourseOverviewMode.DISPLAY}
                                    courseCreditHours={course.creditHours}
                                    courseDescription={course.description}
                                    courseSection={course.section}
                                    courseTitle={course.title}
                                    onClick={this.handleViewCourseDetailed}
                                    onHover={this.handleCourseHover}
                                    onEditClick={this.handleEditClick}
                                />
                            );
                        }).toList()
                    }
                </div>
            </div>
        );
    }

    private handleCourseHover(title: string) {
        const handler = this.props.handleSetActiveCourse;
        const { isCreating, isEditing } = this.state;
        if (handler && !isCreating && !isEditing) {
            handler(title);
        }
    }

    private handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        const { detailedCourse } = this.props;
        if (detailedCourse) {
            this.setState({
                isCreating: false,
                isEditing: true,
            });
        }
    }

    private handleCourseSave(course: Course, originalCourse?: Course) {
        const { isCreating, isEditing } = this.state;
        if (isCreating) {
            const handler = this.props.handleCreateNewCourse;
            if (handler) {
                handler(course);
            }
        }
        if (isEditing) {
            // reimplement
        }
    }

    private handleViewCourseDetailed() {
        const handler = this.props.push;
        if (handler) {
            handler(`/${this.props.detailedCourse}`);
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

export default styled(HomePage)`
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
