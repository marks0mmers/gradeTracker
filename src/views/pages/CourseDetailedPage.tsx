import { Fragment, MouseEvent, useCallback, useState , useMemo, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { useHistory } from "react-router";
import ActivityLoading from "../components/shared/LoadingMask";
import { categoryColumns } from "../../constants/columns/CategoryColumns";
import { GradeCategory } from "../../models/GradeCategory";
import {
    getActiveCourse,
    getDetailedCourseElements,
    getSelectedGradeCategory,
    SelectGradeCategoryCreator,
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import {
    DeleteGradeCategoryCreator,
    getGradeCategories,
    GetGradeCategoryForCourseCreator,
} from "../../state/ducks/data/gradeCategories";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import CategoryDetailedPane from "../components/category/CategoryDetailedPane";
import Button from "../components/shared/Button";
import Divider from "../components/shared/Divider";
import DataGrid from "../controls/data-grid";
import CategoryFormModal from "../modals/CategoryFormModal";
import ModalHeader from "../modals/common/ModalHeader";
import { getIsLoading } from "../../state/ducks/control/loadingmask/selectors";

const CourseDetailedPage = () => {
    const { push } = useHistory();

    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const appState = useMapState((state: RootState) => ({
        isLoading: getIsLoading(state),
        categoryElements: getDetailedCourseElements(state),
        selectedCategory: getSelectedGradeCategory(state),
        categories: getGradeCategories(state),
        course: getActiveCourse(state),
    }));

    const dispatch = useMapDispatch({
        selectGradeCategory: SelectGradeCategoryCreator,
        setActiveCourse: SetActiveCourseCreator,
        deleteGradeCategory: DeleteGradeCategoryCreator,
        getGradeCategoriesForCourse: GetGradeCategoryForCourseCreator,
    });

    useEffect(() => {
        if (appState.course) {
            document.title = `${appState.course.title} Details`;
            dispatch.getGradeCategoriesForCourse(appState.course.id || "");
        }
        return () => {
            dispatch.selectGradeCategory(undefined);
        };
    }, [dispatch, appState.course]);

    const handleBodyCellClick = useCallback((event: MouseEvent<HTMLDivElement>, payload: GradeCategory) => {
        const category = appState.categories.find((value) => value.id === payload.id);
        if (payload.title !== "Total") {
            dispatch.selectGradeCategory(category?.id);
        }
    }, [dispatch, appState.categories]);

    const handleCreate = useCallback(() => {
        setIsCreating(true);
        setIsEditing(false);
    }, []);

    const handleEdit = useCallback(() => {
        if (appState.selectedCategory) {
            setIsCreating(false);
            setIsEditing(true);
        }
    }, [appState.selectedCategory]);

    const handleDelete = useCallback(() => {
        if (appState.selectedCategory) {
            dispatch.deleteGradeCategory(appState.selectedCategory);
            dispatch.selectGradeCategory(undefined);
        }
    }, [dispatch, appState.selectedCategory]);

    const handleCancel = useCallback(() => {
        setIsCreating(false);
        setIsEditing(false);
    }, []);

    const handleRootClick = useCallback(() => {
        dispatch.setActiveCourse();
        push("/");
    }, [push, dispatch]);

    const selected = useMemo(
        () => appState.categories.get(appState.selectedCategory || ""),
        [appState.categories, appState.selectedCategory],
    );

    return (
        <>
        { appState.isLoading && <ActivityLoading /> }
        <Container id={`${appState.course?.title ?? ""}-detailed`}>
            <ClickRoute
                id="click-route"
                onClick={handleRootClick}
            >
                {"< Back to Courses"}
            </ClickRoute>
            <Buttons id="buttons">
                <ButtonLabel id="button-label">Grade Category Actions:</ButtonLabel>
                <Button
                    tooltip="Create New Category"
                    icon="add"
                    height={30}
                    width={50}
                    marginLeftRight={5}
                    onClick={handleCreate}
                />
                <Button
                    tooltip="Edit Selected Category"
                    icon="create"
                    height={30}
                    width={50}
                    marginLeftRight={5}
                    onClick={handleEdit}
                />
                <Button
                    tooltip="Delete Selected Category"
                    icon="delete_sweep"
                    height={30}
                    width={50}
                    marginLeftRight={5}
                    onClick={handleDelete}
                />
            </Buttons>
            <Content id="main-content">
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
                        title="Course Category Form"
                        exitModal={handleCancel}
                    />
                    <CategoryFormModal
                        isCreating={isCreating}
                        exitModal={handleCancel}
                        originalCategory={appState.categories.get(appState.selectedCategory || "")}
                        initialValues={selected && {
                            title: selected.title,
                            percentage: selected.percentage,
                            numberOfGrades: selected.numberOfGrades,
                        }}
                    />
                </ReactModal>
                <DataGrid
                    id="grade-category-grid"
                    columnDefinitions={categoryColumns}
                    elements={appState.categoryElements}
                    onBodyCellClick={handleBodyCellClick}
                />
                {
                    appState.selectedCategory &&
                    <Fragment>
                        <Divider
                            isVertical={false}
                            top={10}
                            bottom={10}
                        />
                        <CategoryDetailedPane
                            selectedCategory={appState.categories.get(appState.selectedCategory)}
                        />
                    </Fragment>
                }
            </Content>
        </Container>
        </>
    );
};

const Content = styled.div`
    grid-area: content;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 21px minmax(0, 1fr);
`;

const ClickRoute = styled.span`
    padding: 10px 0;
    grid-area: course;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #222;
    }
`;

const Buttons = styled.div`
    margin: 10px 0;
    display: flex;
    justify-content: flex-end;
    grid-area: buttons;
`;

const ButtonLabel = styled.span`
    font-size: 14px;
    margin: auto 0;
`;

const Container = styled.div`
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: auto auto 1fr;
    padding: 0 10px;
    grid-template-areas: "course buttons buttons"
                        "content content content";
`;

export default CourseDetailedPage;
