import { push } from "connected-react-router";
import { List } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import {
    SelectGradeCategoryCreator,
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import {
    AddGradeToCategoryCreator,
    CreateCategoryCreator,
    DeleteCategoryCreator,
    DeleteGradeFromCategoryCreator,
    UpdateCategoryCreator,
} from "../../state/ducks/data/courses";
import CategoryDetailedPane from "../components/category/CategoryDetailedPane";
import CourseCategoryForm from "../components/category/CourseCategoryForm";
import Divider from "../components/Divider";
import Button from "../controls/button/package/Button";
import { BodyCellProps } from "../controls/data-grid";
import { DataGridColumnDefinition } from "../controls/data-grid";
import { DataGridElement } from "../controls/data-grid";
import DataGrid from "../controls/data-grid";

interface Props {
    className?: string;
    courses: List<Course>;
    detailedCourse: string;
    categoryColumns: List<DataGridColumnDefinition<GradeCategory>>;
    categoryElements: List<DataGridElement<GradeCategory>>;
    selectedCategory?: string;

    setActiveCourse: typeof SetActiveCourseCreator;
    selectGradeCategory: typeof SelectGradeCategoryCreator;
    handleAddNewGrade: typeof AddGradeToCategoryCreator;
    handleDeleteCategory: typeof DeleteCategoryCreator;
    handleDeleteGrade: typeof DeleteGradeFromCategoryCreator;
    handleNewCategory: typeof CreateCategoryCreator;
    handleEditCategory: typeof UpdateCategoryCreator;
    push: typeof push;
}

interface State {
    isCreating: boolean;
    isEditing: boolean;
}

class CourseDetailedContent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleBodyCellClick = this.handleBodyCellClick.bind(this);
        this.handleRootClick = this.handleRootClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancelCreate = this.handleCancelCreate.bind(this);
        this.handleFormSave = this.handleFormSave.bind(this);

        this.state = {
            isCreating: false,
            isEditing: false,
        };
    }

    public componentWillUnmount() {
        const handler = this.props.selectGradeCategory;
        if (handler) {
            handler(undefined);
        }
    }

    public render() {
        const {
            className,
            courses,
            detailedCourse,
            categoryElements,
            categoryColumns,
            selectedCategory,
        } = this.props;

        const {
            isCreating,
            isEditing,
        } = this.state;

        const course: Course | undefined = courses && courses.find((value: Course) => value.title === detailedCourse);

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
                        onClick={this.handleCreate}
                    />
                    <Button
                        tooltip="Edit Selected Category"
                        icon="create"
                        height={30}
                        width={50}
                        onClick={this.handleEdit}
                    />
                    <Button
                        tooltip="Delete Selected Category"
                        icon="delete_sweep"
                        height={30}
                        width={50}
                        onClick={this.handleDelete}
                    />
                </div>
                <Divider
                    gridArea="divider"
                />
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
                            originalCategory={course && course.categories &&
                                course.categories.find((value: GradeCategory) => value.title === selectedCategory)}
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
                        <>
                        <Divider
                            isVertical={false}
                            top={10}
                            bottom={10}
                        />
                        <CategoryDetailedPane
                            handleAddNewGrade={this.props.handleAddNewGrade}
                            handleDeleteGrade={this.props.handleDeleteGrade}
                            selectedCategory={selectedCategory}
                            course={course}
                        />
                        </>
                    }
                </Content>
            </div>
        );
    }

    private handleFormSave(courseToChange: Course, category: GradeCategory) {
        const { isCreating, isEditing } = this.state;
        if (isCreating) {
            const handler = this.props.handleNewCategory;
            if (handler) {
                handler(courseToChange, category);
            }
        }
        if (isEditing) {
            const handler = this.props.handleEditCategory;
            const { courses, detailedCourse, selectedCategory } = this.props;
            const course: Course | undefined = courses &&
                courses.find((value: Course) => value.title === detailedCourse);
            const originalCategory = course && course.categories &&
                course.categories.find((value: GradeCategory) => value.title === selectedCategory);
            const updatedCategory = originalCategory && new GradeCategory({
                grades: originalCategory.grades,
                numberOfGrades: category.numberOfGrades,
                percentage: category.percentage,
                title: category.title,
            });
            if (handler) {
                handler(course.title, originalCategory || new GradeCategory(), updatedCategory || category);
            }
        }
    }

    private handleBodyCellClick(
        event: React.MouseEvent<HTMLDivElement>,
        payload: GradeCategory,
        props: BodyCellProps,
    ) {
        const handler = this.props.selectGradeCategory;
        const { courses, detailedCourse } = this.props;
        if (handler && payload.title !== "Total") {
            const course = courses && courses.find((value: Course) => value.title === detailedCourse);
            const category = course && course.categories && course.categories.find((value: GradeCategory) => {
                return value.title === payload.title;
            });
            if (category) {
                handler(category.title);
            }
        }
    }

    private handleCreate() {
        this.setState({
            isCreating: true,
            isEditing: false,
        });
    }

    private handleEdit() {
        const { selectedCategory } = this.props;
        if (selectedCategory) {
            this.setState({
                isCreating: false,
                isEditing: true,
            });
        }
    }

    private handleDelete() {
        const { courses, detailedCourse, selectedCategory } = this.props;
        const course: Course | undefined = courses && courses.find((value: Course) => value.title === detailedCourse);
        const handler = this.props.handleDeleteCategory;
        if (handler && course && selectedCategory) {
            handler(course.title, selectedCategory);
        }
    }

    private handleCancelCreate() {
        this.setState({
            isCreating: false,
            isEditing: false,
        });
    }

    private handleRootClick() {
        const handler = this.props.setActiveCourse;
        if (handler) {
            handler(undefined);
        }
        this.props.push("/");
    }

}

export default styled(CourseDetailedContent)`
    display: grid;
    grid-template-rows: auto 1px minmax(0, 1fr);
    grid-template-columns: auto auto 1fr;
    grid-template-areas: "course buttons buttons"
                         "divider divider divider"
                         "content content content";
    background: ${(props) => props.theme.white};
    padding: 0 10px;

    .click-route {
        padding: 10px 0;
        color: ${(props) => props.theme.primaryText};
        grid-area: course;
        font-size: 24px;
        cursor: pointer;
        &:hover {
            color: ${(props) => props.theme.secondary}
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
        color: ${(props) => props.theme.primaryText};
    }
`;
