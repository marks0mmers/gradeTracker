import { push } from "connected-react-router";
import { List, Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { CourseOverviewMode } from "../../constants/CourseOverviewMode";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import {
    CreateCourseFormChangeCreator,
    CreateCourseFormClearCreator,
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import { CreateCourseCreator, DeleteCourseCreator } from "../../state/ducks/data/courses";
import CourseOverviewButton from "../components/course/CourseOverviewButton";
import Divider from "../components/Divider";
import Button from "../controls/button/package/Button";
import { ButtonWrapper } from "../wrappers/ButtonWrapper";

interface Props {
    className?: string;
    courses?: List<Course>;
    courseFormValues: Map<string, string>;
    detailedCourse?: string;
    selectedGradeCategory: GradeCategory;

    handleCreateCourse: typeof CreateCourseCreator;
    handleDeleteCourse: typeof DeleteCourseCreator;
    handleCreateCourseFormChange: typeof CreateCourseFormChangeCreator;
    handleCreateCourseFormClear: typeof CreateCourseFormClearCreator;
    handleSetActiveCourse: typeof SetActiveCourseCreator;
    push: typeof push;
}

interface State {
    isCreating?: boolean;
}

class HomePage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleViewCourseDetailed = this.handleViewCourseDetailed.bind(this);
        this.handleRootClick = this.handleRootClick.bind(this);
        this.handleNewCourseClick = this.handleNewCourseClick.bind(this);
        this.handleNewCourseCancel = this.handleNewCourseCancel.bind(this);
        this.handleCourseHover = this.handleCourseHover.bind(this);

        this.state = {
            isCreating: false,
        };
    }

    public render() {
        const {
            className,
            courses,
        } = this.props;

        const {
            isCreating,
        } = this.state;

        return (
            <div id="home-content" className={className}>
                <h2
                    className="route"
                    onClick={this.handleRootClick}
                >
                    Courses
                </h2>
                <ButtonWrapper>
                    {
                        !isCreating &&
                        <>
                        <span className="button-label">Create New Course:</span>
                        <Button
                            icon="add"
                            height={30}
                            width={50}
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
                            formValues={this.props.courseFormValues}
                            onFormChange={this.props.handleCreateCourseFormChange}
                            onFormClear={this.props.handleCreateCourseFormClear}
                            onFormSubmit={this.props.handleCreateCourse}
                        />
                    }
                    {
                        courses && courses.reverse().map((course: Course, key: number) => (
                            <CourseOverviewButton
                                key={key}
                                mode={CourseOverviewMode.DISPLAY}
                                courseCreditHours={course.creditHours}
                                courseDescription={course.description}
                                courseSection={course.section}
                                courseTitle={course.title}
                                onClick={this.handleViewCourseDetailed}
                                onHover={this.handleCourseHover}
                                onDeleteClick={this.props.handleDeleteCourse}
                            />
                        )).toList()
                    }
                </div>
            </div>
        );
    }

    private handleCourseHover(title: string) {
        const handler = this.props.handleSetActiveCourse;
        if (handler) {
            handler(title);
        }
    }

    private handleViewCourseDetailed() {
        this.props.push(`/${this.props.detailedCourse}`);
    }

    private handleNewCourseClick() {
        this.setState({
            isCreating: true,
        });
    }

    private handleNewCourseCancel() {
        this.setState({
            isCreating: false,
        });
    }

    private handleRootClick() {
        const handler = this.props.handleSetActiveCourse;
        if (handler) {
            handler(undefined);
        }
        this.props.push("/");
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
        padding: 10px
        margin-left: 10px;
        color: ${(props) => props.theme.primaryText};
        cursor: pointer;
        &:hover {
            color: ${(props) => props.theme.secondary}
        }
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
