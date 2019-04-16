import { push } from "connected-react-router";
import { List, Map } from "immutable";
import React, { Fragment, MouseEvent, useEffect, useState } from "react";
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
    getActiveCourse,
    getDetailedColumns,
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
import CategoryDetailedPane from "../components/category/CategoryDetailedPane";
import Divider from "../components/Divider";
import Button from "../controls/button/Button";
import DataGrid from "../controls/data-grid";
import { DataGridElement } from "../controls/data-grid";
import { DataGridColumnDefinition } from "../controls/data-grid";
import CategoryFormModal from "../modals/CategoryFormModal";
import ModalHeader from "../modals/common/ModalHeader";

interface PassedProps {
    className?: string;
}

interface PropsFromState {
    categoryColumns: List<DataGridColumnDefinition<GradeCategory>>;
    categoryElements: List<DataGridElement<GradeCategory>>;
    course: Course;
    currentUser: User;
    categories?: Map<string, GradeCategory>;
    selectedCategory: string;
}

interface PropsFromDispatch {
    setActiveCourse: typeof SetActiveCourseCreator;
    selectGradeCategory: typeof SelectGradeCategoryCreator;
    deleteGradeCategory: typeof DeleteGradeCategoryCreator;
    getGradeCategoriesForCourse: typeof GetGradeCategoryForCourseCreator;
    push: typeof push;
}

type Props = PassedProps & PropsFromState & PropsFromDispatch;

interface State {
    isCreating: boolean;
    isEditing: boolean;
}

const CourseDetailedPage = (props: Props) => {

    const [state, setState] = useState<State>({
        isCreating: false,
        isEditing: false,
    });

    // didMount and willUnmount
    useEffect(() => {
        props.getGradeCategoriesForCourse(props.course.id || "");
        return () => {
            props.selectGradeCategory(undefined);
        };
    }, []);

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
        const { categories, selectGradeCategory } = props;
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
        if (props.selectedCategory) {
            setState({
                isCreating: false,
                isEditing: true,
            });
        }
    };

    const handleDelete = () => {
        if (props.selectedCategory) {
            props.deleteGradeCategory(props.selectedCategory);
            props.selectGradeCategory(undefined);
        }
    };

    const handleCancel = () => {
        setState({
            isCreating: false,
            isEditing: false,
        });
    };

    const handleRootClick = () => {
        props.setActiveCourse();
        props.push("/");
    };

    return (
        <div id={`${props.course ? props.course.title : ""}-detailed`} className={props.className}>
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
                        course={props.course}
                        exitModal={handleCancel}
                        originalCategory={props.categories && props.categories.get(props.selectedCategory)}
                        initialValues={props.categories && props.categories.get(props.selectedCategory) && {
                            title: props.categories.get(props.selectedCategory).title,
                            percentage: props.categories.get(props.selectedCategory).percentage,
                            numberOfGrades: props.categories.get(props.selectedCategory).numberOfGrades,
                        }}
                    />
                </ReactModal>
                <DataGrid
                    id="grade-category-grid"
                    columnDefinitions={props.categoryColumns}
                    elements={props.categoryElements}
                    onBodyCellClick={handleBodyCellClick}
                />
                {
                    props.selectedCategory &&
                    <Fragment>
                        <Divider
                            isVertical={false}
                            top={10}
                            bottom={10}
                        />
                        <CategoryDetailedPane
                            selectedCategory={props.categories && props.categories.get(props.selectedCategory)}
                        />
                    </Fragment>
                }
            </Content>
        </div>
    );

};

const mapStateToProps = (state: RootState) => ({
    categoryColumns: getDetailedColumns(state),
    categoryElements: getDetailedCourseElements(state),
    detailedCourse: getActiveCourse(state),
    selectedCategory: getSelectedGradeCategory(state),
    currentUser: getCurrentUser(state),
    categories: getGradeCategories(state),
    course: getActiveCourse(state),
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        push,
        selectGradeCategory: SelectGradeCategoryCreator,
        setActiveCourse: SetActiveCourseCreator,
        deleteGradeCategory: DeleteGradeCategoryCreator,
        getGradeCategoriesForCourse: GetGradeCategoryForCourseCreator,
    }, dispatch);
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(CourseDetailedPage))`
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
