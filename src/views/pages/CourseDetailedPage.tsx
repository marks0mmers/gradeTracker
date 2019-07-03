import { push } from "connected-react-router";
import React, { Fragment, MouseEvent, useState } from "react";
import ReactModal from "react-modal";
import { match } from "react-router";
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
import Divider from "../components/shared/Divider";
import Button from "../controls/button/Button";
import DataGrid from "../controls/data-grid";
import CategoryFormModal from "../modals/CategoryFormModal";
import ModalHeader from "../modals/common/ModalHeader";

interface Props {
    className?: string;
    match: match<{courseTitle: string}>;
}

interface State {
    isCreating: boolean;
    isEditing: boolean;
}

const CourseDetailedPage = (props: Props) => {

    const [state, setState] = useState<State>({
        isCreating: false,
        isEditing: false,
    });

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

    useComponentMount(() => {
        if (course) {
            document.title = `${course.title} Details`;
            getGradeCategoriesForCourse(course.id || "");
        }
        return () => {
            selectGradeCategory(undefined);
        };
    });

    const Content = state.isCreating || state.isEditing
        ? styled.div`
            grid-area: content;
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto auto 21px minmax(0, 1fr);
        `
        : styled.div`
            grid-area: content;
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: auto 21px minmax(0, 1fr);
        `;

    const handleBodyCellClick = (event: MouseEvent<HTMLDivElement>, payload: GradeCategory) => {
        const category = categories && categories.find((value: GradeCategory) => value.id === payload.id);
        if (category && payload.title !== "Total") {
            selectGradeCategory(category.id);
        }
    };

    const handleCreate = () => {
        setState({
            isCreating: true,
            isEditing: false,
        });
    };

    const handleEdit = () => {
        if (selectedCategory) {
            setState({
                isCreating: false,
                isEditing: true,
            });
        }
    };

    const handleDelete = () => {
        if (selectedCategory) {
            deleteGradeCategory(selectedCategory);
            selectGradeCategory(undefined);
        }
    };

    const handleCancel = () => {
        setState({
            isCreating: false,
            isEditing: false,
        });
    };

    const handleRootClick = () => {
        setActiveCourse();
        pushRoute("/");
    };

    const selected = categories && categories.get(selectedCategory || "");

    return (
        <div id={`${course ? course.title : ""}-detailed`} className={props.className}>
            <span
                className="click-route"
                onClick={handleRootClick}
            >
                {"< Back to Courses"}
            </span>
            <div className="buttons">
                <span className="button-label">Grade Category Actions:</span>
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
            </div>
            <Content>
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
                        title="Course Category Form"
                        exitModal={handleCancel}
                    />
                    <CategoryFormModal
                        isCreating={state.isCreating}
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
        </div>
    );

};

export default styled(CourseDetailedPage)`
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: auto auto 1fr;
    grid-template-areas: "course buttons buttons"
                         "content content content";
    padding: 0 10px;

    .click-route {
        padding: 10px 0;
        grid-area: course;
        font-size: 24px;
        cursor: pointer;
        &:hover {
            color: #222;
        }
    }

    .buttons {
        margin: 10px 0;
        display: flex;
        justify-content: flex-end;
        grid-area: buttons;
    }

    .button-label {
        font-size: 14px;
        margin: auto 0;
    }
`;
