import { Fragment, useCallback, useState, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { useHistory } from "react-router";
import ActivityLoading from "../components/shared/LoadingMask";
import { Course } from "../../models/Course";
import { getCourses } from "../../state/ducks/data/courses";
import { getCurrentUser } from "../../state/ducks/data/users";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import CourseOverviewButton from "../components/course/CourseOverviewButton";
import Button from "../components/shared/Button";
import Divider from "../components/shared/Divider";
import ModalHeader from "../modals/common/ModalHeader";
import CourseFormModal from "../modals/CourseFormModal";
import { getIsLoading } from "../../state/ducks/control/loadingmask/selectors";
import { GetCoursesCurrentUserCreator } from "../../state/ducks/data/courses";

const HomePage = () => {
    const { push } = useHistory();

    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined);

    const appState = useMapState((state: RootState) => ({
        isLoading: getIsLoading(state),
        courses: getCourses(state),
        currentUser: getCurrentUser(state),
    }));

    const dispatch = useMapDispatch({fetchCourses: GetCoursesCurrentUserCreator});

    useEffect(() => {
        document.title = "Grade Tracker";
        if (!appState.currentUser) {
            push("/login");
        } else {
            dispatch.fetchCourses();
        }
    }, [dispatch, appState.currentUser, push]);

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

    const getCourseButtons = useCallback(() => appState.courses.map((course, key) => (
        <CourseOverviewButton
            key={key}
            course={course}
            onEditClick={handleEditClick}
        />
    )).toList(), [handleEditClick, appState.courses]);

    return (
        <>
        { appState.isLoading && <ActivityLoading /> }
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
};

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

export default HomePage;
