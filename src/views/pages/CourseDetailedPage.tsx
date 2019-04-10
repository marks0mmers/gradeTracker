import { push } from "connected-react-router";
import { List, Map } from "immutable";
import React, { Component, Fragment, MouseEvent } from "react";
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
import { CreateGradeCategoryCreator, GetGradeCategoryForCourseCreator } from "../../state/ducks/data/gradeCategories";
import CategoryDetailedPane from "../components/category/CategoryDetailedPane";
import CourseCategoryForm from "../components/category/CourseCategoryForm";
import Divider from "../components/Divider";
import Button from "../controls/button/Button";
import DataGrid from "../controls/data-grid";
import { DataGridElement } from "../controls/data-grid";
import { DataGridColumnDefinition } from "../controls/data-grid";

interface PassedProps {
    className?: string;
}

interface PropsFromState {
    categoryColumns: List<DataGridColumnDefinition<GradeCategory>>;
    categoryElements: List<DataGridElement<GradeCategory>>;
    course: Course;
    currentUser: User;
    categories: Map<string, GradeCategory>;
    selectedCategory: string;
}

interface PropsFromDispatch {
    setActiveCourse: typeof SetActiveCourseCreator;
    selectGradeCategory: typeof SelectGradeCategoryCreator;
    createGradeCategory: typeof CreateGradeCategoryCreator;
    getGradeCategoriesForCourse: typeof GetGradeCategoryForCourseCreator;
    push: typeof push;
}

type Props = PassedProps & PropsFromState & PropsFromDispatch;

interface State {
    isCreating: boolean;
    isEditing: boolean;
}

class CourseDetailedPage extends Component<Props, State> {

    public readonly state = {
        isCreating: false,
        isEditing: false,
    };

    public componentDidMount() {
        this.props.getGradeCategoriesForCourse(this.props.course.id || "");
    }

    public componentWillUnmount() {
        this.props.selectGradeCategory(undefined);
    }

    public render() {
        const {
            className,
            course,
            categories,
            categoryElements,
            categoryColumns,
            selectedCategory,
        } = this.props;

        const {
            isCreating,
            isEditing,
        } = this.state;

        const Content = isCreating || isEditing
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

        return (
            <div id={`${course ? course.title : ""}-detailed`} className={className}>
                <span
                    className="click-route"
                    onClick={this.handleRootClick}
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
                        onClick={this.handleCreate}
                    />
                    <Button
                        tooltip="Edit Selected Category"
                        icon="create"
                        height={30}
                        width={50}
                        marginLeftRight={5}
                        onClick={this.handleEdit}
                    />
                    <Button
                        tooltip="Delete Selected Category"
                        icon="delete_sweep"
                        height={30}
                        width={50}
                        marginLeftRight={5}
                        onClick={this.handleDelete}
                    />
                </div>
                {/* <Divider
                    gridArea="divider"
                /> */}
                <Content>
                    {
                        isCreating &&
                        <CourseCategoryForm
                            course={course}
                            handleCancelCreate={this.handleCancelCreate}
                            handleFormSave={this.handleFormSave}
                        />
                    }
                    {
                        isEditing &&
                        <CourseCategoryForm
                            course={course}
                            handleCancelCreate={this.handleCancelCreate}
                            originalCategory={categories && categories &&
                                categories.find((value: GradeCategory) => value.title === selectedCategory)}
                            handleFormSave={this.handleFormSave}
                        />
                    }
                    <DataGrid
                        id="grade-category-grid"
                        columnDefinitions={categoryColumns}
                        elements={categoryElements}
                        onBodyCellClick={this.handleBodyCellClick}
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
    }

    private handleFormSave = (course: Course, category: GradeCategory) => {
        const { isCreating, isEditing } = this.state;
        if (isCreating && this.props.currentUser) {
            this.props.createGradeCategory(
                category.set("courseId", course.id).set("userId", this.props.currentUser._id) as GradeCategory,
                course.id || "",
            );
        }
        if (isEditing) {
            // reimplement this
        }
    }

    private handleBodyCellClick = (event: MouseEvent<HTMLDivElement>, payload: GradeCategory) => {
        const { categories, selectGradeCategory } = this.props;
        const category = categories && categories.find((value: GradeCategory) => value.id === payload.id);
        if (category && payload.title !== "Total") {
            selectGradeCategory(category.id);
        }
    }

    private handleCreate = () => {
        this.setState({
            isCreating: true,
            isEditing: false,
        });
    }

    private handleEdit = () => {
        if (this.props.selectedCategory) {
            this.setState({
                isCreating: false,
                isEditing: true,
            });
        }
    }

    private handleDelete = () => {
        // reimplement this
    }

    private handleCancelCreate = () => {
        this.setState({
            isCreating: false,
            isEditing: false,
        });
    }

    private handleRootClick = () => {
        this.props.setActiveCourse(undefined);
        this.props.push("/");
    }

}

const mapStateToProps = (state: RootState) => ({
    categoryColumns: getDetailedColumns(state),
    categoryElements: getDetailedCourseElements(state),
    detailedCourse: getActiveCourse(state),
    selectedCategory: getSelectedGradeCategory(state),
    currentUser: getCurrentUser(state),
    course: getActiveCourse(state),
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        push,
        selectGradeCategory: SelectGradeCategoryCreator,
        setActiveCourse: SetActiveCourseCreator,
        createGradeCategory: CreateGradeCategoryCreator,
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
