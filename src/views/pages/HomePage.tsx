import { push } from "connected-react-router";
import { Map } from "immutable";
import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getCurrentUser } from "src/state/ducks/data/users";
import { RootState } from "src/state/rootReducer";
import styled from "styled-components";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import { User } from "../../models/User";
import {
    getDetailedColumns, getDetailedCourseElements, getSelectedGradeCategory, SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import {
    CreateNewCourseCreator,
    DeleteCourseCreator,
    EditCourseCreator,
    getCourses,
} from "../../state/ducks/data/courses";
import CourseOverviewButton from "../components/course/CourseOverviewButton";
import Divider from "../components/Divider";
import Button from "../controls/button/Button";
import ModalHeader from "../modals/common/ModalHeader";
import CourseFormModal from "../modals/CourseFormModal";

interface PassedProps {
    className?: string;
}

interface PropsFromState {
    courses: Map<string, Course>;
    selectedGradeCategory: GradeCategory;
    currentUser: User;
}

interface PropsFromDispatch {
    handleCreateNewCourse: typeof CreateNewCourseCreator;
    handleEditCourse: typeof EditCourseCreator;
    handleDeleteCourse: typeof DeleteCourseCreator;
    handleSetActiveCourse: typeof SetActiveCourseCreator;
    push: typeof push;
}

type Props = PassedProps & PropsFromState & PropsFromDispatch;

interface State {
    isCreating: boolean;
    isEditing: boolean;
    editingCourse?: Course;
}

class HomePage extends Component<Props, State> {

    public state: State = {
        isCreating: false,
        isEditing: false,
        editingCourse: undefined,
    };

    public render() {
        const {
            isCreating,
            isEditing,
        } = this.state;

        return (
            <div id="home-content" className={this.props.className}>
                <h2 className="route">Courses</h2>
                <ButtonWrapper id="button-wrapper">
                    {
                        !isCreating &&
                        <Fragment>
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
                        </Fragment>
                    }
                </ButtonWrapper>
                <Divider isVertical={false} gridArea="divider"/>
                <div className="content">
                    <ReactModal
                        style={{
                            overlay: {
                                background: "rgba(0, 0, 0, 0.5)",
                            },
                            content: {
                                height: "fit-content",
                                width: "40%",
                                left: "30%",
                            },
                        }}
                        isOpen={isCreating || isEditing}
                        onRequestClose={this.handleCancel}
                    >
                        <ModalHeader
                            title="Add Course to Tracker"
                            exitModal={this.handleCancel}
                        />
                        <CourseFormModal
                            isCreating={isCreating}
                            exitModal={this.handleCancel}
                            originalCourse={this.state.editingCourse}
                            initialValues={this.state.editingCourse && {
                                title: this.state.editingCourse.title,
                                description: this.state.editingCourse.description,
                                creditHours: this.state.editingCourse.creditHours,
                                section: this.state.editingCourse.section,
                            }}
                        />
                    </ReactModal>
                    {this.getCourseButtons()}
                </div>
            </div >
        );
    }

    private getCourseButtons = () => {
        return this.props.courses && this.props.courses.map((course: Course, key: string) => {
            return (
                <CourseOverviewButton
                    key={key}
                    course={course}
                    onClick={this.props.handleSetActiveCourse}
                    onDeleteClick={this.props.handleDeleteCourse}
                    onEditClick={this.handleEditClick}
                />
            );
        }).toList();
    }

    private handleEditClick = (course?: Course) => {
        this.setState({
            isCreating: false,
            isEditing: true,
            editingCourse: course,
        });
    }

    private handleNewCourseClick = () => {
        this.setState({
            isCreating: true,
            isEditing: false,
        });
    }

    private handleCancel = () => {
        this.setState({
            isCreating: false,
            isEditing: false,
        });
    }

}

const ButtonWrapper = styled.div`
    display: flex;
    margin: auto 0;
    justify-content: flex-end;
`;

const mapStateToProps = (state: RootState) => {
    return ({
        courses: getCourses(state),
        categoryColumns: getDetailedColumns(state),
        categoryElements: getDetailedCourseElements(state),
        currentUser: getCurrentUser(state),
        selectedGradeCategory: getSelectedGradeCategory(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        handleSetActiveCourse: SetActiveCourseCreator,
        handleEditCourse: EditCourseCreator,
        handleDeleteCourse: DeleteCourseCreator,
        handleCreateNewCourse: CreateNewCourseCreator,
        push,
    }, dispatch);
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(HomePage))`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto 1fr;
    grid-template-areas: "subheader buttons"
                         "divider divider"
                         "content content";
    overflow-y: scroll;

    .route {
        padding: 10px;
        margin-left: 10px;
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
    }
`;
