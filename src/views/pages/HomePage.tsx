import { push } from "connected-react-router";
import { Map } from "immutable";
import React, { Fragment, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
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
import { getCurrentUser } from "../../state/ducks/data/users";
import { RootState } from "../../state/rootReducer";
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

const HomePage = (props: Props) => {

    const [state, setState] = useState<State>({
        isCreating: false,
        isEditing: false,
        editingCourse: undefined,
    });

    useEffect(() => {
        if (!props.currentUser) {
            props.push("/login");
        }
    }, []);

    const getCourseButtons = () => {
        return props.courses && props.courses.map((course: Course, key: string) => {
            return (
                <CourseOverviewButton
                    key={key}
                    course={course}
                    onClick={props.handleSetActiveCourse}
                    onDeleteClick={props.handleDeleteCourse}
                    onEditClick={handleEditClick}
                />
            );
        }).toList();
    };

    const handleEditClick = (course?: Course) => {
        setState({
            isCreating: false,
            isEditing: true,
            editingCourse: course,
        });
    };

    const handleNewCourseClick = () => {
        setState({
            isCreating: true,
            isEditing: false,
        });
    };

    const handleCancel = () => {
        setState({
            isCreating: false,
            isEditing: false,
        });
    };

    return (
        <div id="home-content" className={props.className}>
            <h2 className="route">Courses</h2>
            <ButtonWrapper id="button-wrapper">
                {
                    !state.isCreating &&
                    <Fragment>
                        <span className="button-label">Create New Course:</span>
                        <Button
                            id="create-new-course"
                            tooltip="Create New Course"
                            icon="add"
                            height={30}
                            width={50}
                            marginLeftRight={5}
                            onClick={handleNewCourseClick}
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
                    isOpen={state.isCreating || state.isEditing}
                    onRequestClose={handleCancel}
                >
                    <ModalHeader
                        title="Add Course to Tracker"
                        exitModal={handleCancel}
                    />
                    <CourseFormModal
                        isCreating={state.isCreating}
                        exitModal={handleCancel}
                        originalCourse={state.editingCourse}
                        initialValues={state.editingCourse && {
                            title: state.editingCourse.title,
                            description: state.editingCourse.description,
                            creditHours: state.editingCourse.creditHours,
                            section: state.editingCourse.section,
                        }}
                    />
                </ReactModal>
                {getCourseButtons()}
            </div>
        </div >
    );

};

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
