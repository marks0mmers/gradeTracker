import { push } from "connected-react-router";
import React, { Fragment, MouseEvent, useCallback, useState , useMemo, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
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

    //#region Component State
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    //#endregion

    //#region Redux State
    const state = useMapState((state: RootState) => ({
        isLoading: getIsLoading(state),
        categoryElements: getDetailedCourseElements(state),
        selectedCategory: getSelectedGradeCategory(state),
        categories: getGradeCategories(state),
        course: getActiveCourse(state),
    }));

    const actions = useMapDispatch({
        pushRoute: push,
        selectGradeCategory: SelectGradeCategoryCreator,
        setActiveCourse: SetActiveCourseCreator,
        deleteGradeCategory: DeleteGradeCategoryCreator,
        getGradeCategoriesForCourse: GetGradeCategoryForCourseCreator,
    });
    //#endregion

    //#region Lifecycle Methods
    useEffect(() => {
        if (state.course) {
            document.title = `${state.course.title} Details`;
            actions.getGradeCategoriesForCourse(state.course.id || "");
        }
        return () => {
            actions.selectGradeCategory(undefined);
        };
    }, [actions, state.course]);
    //#endregion

    //#region Private Methods
    const handleBodyCellClick = useCallback((event: MouseEvent<HTMLDivElement>, payload: GradeCategory) => {
        const category = state.categories.find((value) => value.id === payload.id);
        if (payload.title !== "Total") {
            actions.selectGradeCategory(category?.id);
        }
    }, [actions, state.categories]);

    const handleCreate = useCallback(() => {
        setIsCreating(true);
        setIsEditing(false);
    }, []);

    const handleEdit = useCallback(() => {
        if (state.selectedCategory) {
            setIsCreating(false);
            setIsEditing(true);
        }
    }, [state.selectedCategory]);

    const handleDelete = useCallback(() => {
        if (state.selectedCategory) {
            actions.deleteGradeCategory(state.selectedCategory);
            actions.selectGradeCategory(undefined);
        }
    }, [actions, state.selectedCategory]);

    const handleCancel = useCallback(() => {
        setIsCreating(false);
        setIsEditing(false);
    }, []);

    const handleRootClick = useCallback(() => {
        actions.setActiveCourse();
        actions.pushRoute("/");
    }, [actions]);

    const selected = useMemo(
        () => state.categories.get(state.selectedCategory || ""),
        [state.categories, state.selectedCategory],
    );
    //#endregion

    //#region Render Method
    return (
        <>
        { state.isLoading && <ActivityLoading /> }
        <Container id={`${state.course ? state.course.title : ""}-detailed`}>
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
                        course={state.course}
                        exitModal={handleCancel}
                        categories={state.categories}
                        originalCategory={state.categories.get(state.selectedCategory || "")}
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
                    elements={state.categoryElements}
                    onBodyCellClick={handleBodyCellClick}
                />
                {
                    state.selectedCategory &&
                    <Fragment>
                        <Divider
                            isVertical={false}
                            top={10}
                            bottom={10}
                        />
                        <CategoryDetailedPane
                            selectedCategory={state.categories.get(state.selectedCategory)}
                        />
                    </Fragment>
                }
            </Content>
        </Container>
        </>
    );
    //#endregion
};

//#region Styles
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
//#endregion

export default CourseDetailedPage;
