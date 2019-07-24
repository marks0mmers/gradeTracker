import { push } from "connected-react-router";
import React, { Fragment, useCallback, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import ActivityLoading from "../components/shared/LoadingMask";
import { Course } from "../../models/Course";
import { getCourses } from "../../state/ducks/data/courses";
import { getCurrentUser } from "../../state/ducks/data/users";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import { useComponentMount } from "../../util/Hooks";
import CourseOverviewButton from "../components/course/CourseOverviewButton";
import Button from "../components/shared/Button";
import Divider from "../components/shared/Divider";
import ModalHeader from "../modals/common/ModalHeader";
import CourseFormModal from "../modals/CourseFormModal";
import { getIsLoading } from "../../state/ducks/control/loadingmask/selectors";

const HomePage = () => {

    //#region Component State
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined);
    //#endregion

    //#region Redux State
    const {courses, currentUser, isLoading} = useMapState((state: RootState) => ({
        isLoading: getIsLoading(state),
        courses: getCourses(state),
        currentUser: getCurrentUser(state),
    }));

    const {pushRoute} = useMapDispatch({pushRoute: push});
    //#endregion

    //#region Lifecycle Methods
    useComponentMount(() => {
        document.title = "Grade Tracker";
        if (!currentUser) {
            pushRoute("/login");
        }
    });
    //#endregion

    //#region Private Methods
    const handleEditClick = useCallback((course?: Course) => {
        setIsCreating(false);
        setIsEditing(true);
        setEditingCourse(course);
    }, []);

    const handleNewCourseClick = useCallback(() => {
        setIsCreating(true);
        setIsEditing(false);
    }, []);

    const handleCancel = useCallback(() => {
        setIsCreating(false);
        setIsEditing(false);
    }, []);
    //#endregion

    //#region Display Methods
    const getCourseButtons = useCallback(() => {
        return courses && courses.map((course: Course, key: string) => {
            return (
                <CourseOverviewButton
                    key={key}
                    course={course}
                    onEditClick={handleEditClick}
                />
            );
        }).toList();
    }, [courses, handleEditClick]);
    //#endregion

    //#region Render Method
    return (
        <>
        { isLoading && <ActivityLoading /> }
        <Container id="home-page">
            <Route id="route">Courses</Route>
            <ButtonWrapper id="button-wrapper">
                {
                    !isCreating &&
                    <Fragment>
                        <ButtonLabel id="button-label">Create New Course:</ButtonLabel>
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
            <Content id="content">
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
                    onRequestClose={handleCancel}
                >
                    <ModalHeader
                        title="Add Course to Tracker"
                        exitModal={handleCancel}
                    />
                    <CourseFormModal
                        isCreating={isCreating}
                        exitModal={handleCancel}
                        originalCourse={editingCourse}
                        initialValues={editingCourse && {
                            title: editingCourse.title,
                            description: editingCourse.description,
                            creditHours: editingCourse.creditHours,
                            section: editingCourse.section,
                        }}
                    />
                </ReactModal>
                {getCourseButtons()}
            </Content>
        </Container>
        </>
    );
    //#endregion
};

//#region Styles
const ButtonWrapper = styled.div`
    display: flex;
    margin: auto 0;
    justify-content: flex-end;
`;

const Route = styled.h2`
    padding: 10px;
    margin-left: 10px;
    cursor: default;
`;

const Content = styled.div`
    grid-area: content;
`;

const ButtonLabel = styled.span`
    margin: auto 0;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto 1fr;
    grid-template-areas: "subheader buttons"
                        "divider divider"
                        "content content";
    overflow-y: scroll;
`;
//#endregion

export default HomePage;
