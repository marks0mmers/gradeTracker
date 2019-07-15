import { push } from "connected-react-router";
import React, { Fragment, MouseEvent, useCallback, useState } from "react";
import { useMemo } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
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
import { useComponentMount } from "../../util/Hooks";
import CategoryDetailedPane from "../components/category/CategoryDetailedPane";
import Button from "../components/shared/Button";
import Divider from "../components/shared/Divider";
import DataGrid from "../controls/data-grid";
import CategoryFormModal from "../modals/CategoryFormModal";
import ModalHeader from "../modals/common/ModalHeader";

const CourseDetailedPage = () => {

    //#region Component State
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    //#endregion

    //#region Redux State
    const {
        categoryElements,
        selectedCategory,
        categories,
        course,
    } = useMapState((rootState: RootState) => ({
        categoryElements: getDetailedCourseElements(rootState),
        selectedCategory: getSelectedGradeCategory(rootState),
        categories: getGradeCategories(rootState),
        course: getActiveCourse(rootState),
    }));

    const {
        pushRoute,
        selectGradeCategory,
        setActiveCourse,
        deleteGradeCategory,
        getGradeCategoriesForCourse,
    } = useMapDispatch({
        pushRoute: push,
        selectGradeCategory: SelectGradeCategoryCreator,
        setActiveCourse: SetActiveCourseCreator,
        deleteGradeCategory: DeleteGradeCategoryCreator,
        getGradeCategoriesForCourse: GetGradeCategoryForCourseCreator,
    });
    //#endregion

    //#region Lifecycle Methods
    useComponentMount(() => {
        if (course) {
            document.title = `${course.title} Details`;
            getGradeCategoriesForCourse(course.id || "");
        }
        return () => {
            selectGradeCategory(undefined);
        };
    });
    //#endregion

    //#region Private Methods
    const handleBodyCellClick = useCallback((event: MouseEvent<HTMLDivElement>, payload: GradeCategory) => {
        const category = categories && categories.find((value: GradeCategory) => value.id === payload.id);
        if (category && payload.title !== "Total") {
            selectGradeCategory(category.id);
        }
    }, [categories, selectGradeCategory]);

    const handleCreate = useCallback(() => {
        setIsCreating(true);
        setIsEditing(false);
    }, []);

    const handleEdit = useCallback(() => {
        if (selectedCategory) {
            setIsCreating(false);
            setIsEditing(true);
        }
    }, [selectedCategory]);

    const handleDelete = useCallback(() => {
        if (selectedCategory) {
            deleteGradeCategory(selectedCategory);
            selectGradeCategory(undefined);
        }
    }, [deleteGradeCategory, selectGradeCategory, selectedCategory]);

    const handleCancel = useCallback(() => {
        setIsCreating(false);
        setIsEditing(false);
    }, []);

    const handleRootClick = useCallback(() => {
        setActiveCourse();
        pushRoute("/");
    }, [pushRoute, setActiveCourse]);

    const selected = useMemo(
        () => categories && categories.get(selectedCategory || ""),
        [categories, selectedCategory],
    );
    //#endregion

    //#region Render Method
    return (
        <Container id={`${course ? course.title : ""}-detailed`}>
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
                        course={course}
                        exitModal={handleCancel}
                        categories={categories}
                        originalCategory={categories && categories.get(selectedCategory || "")}
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
                    elements={categoryElements}
                    onBodyCellClick={handleBodyCellClick}
                />
                {
                    selectedCategory &&
                    <Fragment>
                        <Divider
                            isVertical={false}
                            top={10}
                            bottom={10}
                        />
                        <CategoryDetailedPane
                            selectedCategory={categories && categories.get(selectedCategory)}
                        />
                    </Fragment>
                }
            </Content>
        </Container>
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
