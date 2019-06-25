import { push } from "connected-react-router";
import React, { Fragment, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { Course } from "../../models/Course";
import { getCourses } from "../../state/ducks/data/courses";
import { getCurrentUser } from "../../state/ducks/data/users";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import { useComponentMount } from "../../util/Hooks";
import CourseOverviewButton from "../components/course/CourseOverviewButton";
import Divider from "../components/shared/Divider";
import Button from "../controls/button/Button";
import ModalHeader from "../modals/common/ModalHeader";
import CourseFormModal from "../modals/CourseFormModal";

interface Props {
    className?: string;
}

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

    const {courses, currentUser} = useMapState((rootState: RootState) => ({
        courses: getCourses(rootState),
        currentUser: getCurrentUser(rootState),
    }));

    const {pushRoute} = useMapDispatch({pushRoute: push});

    useComponentMount(() => {
        document.title = "Grade Tracker";
        if (!currentUser) {
            pushRoute("/login");
        }
    });

    const getCourseButtons = () => {
        return courses && courses.map((course: Course, key: string) => {
            return (
                <CourseOverviewButton
                    key={key}
                    course={course}
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

export default styled(HomePage)`
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
