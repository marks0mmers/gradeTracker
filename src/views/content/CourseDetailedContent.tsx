import { push } from "connected-react-router";
import { List, Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import {
    CreateCategoryFormChangeCreator,
    CreateCategoryFormClearCreator,
    SelectGradeCategoryCreator,
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import { CreateCategoryCreator } from "../../state/ducks/data/courses";
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
    formValues: Map<string, string>;
    selectedCategory?: GradeCategory;

    handleFormChange: typeof CreateCategoryFormChangeCreator;
    handleFormClear: typeof CreateCategoryFormClearCreator;
    setActiveCourse: typeof SetActiveCourseCreator;
    selectGradeCategory: typeof SelectGradeCategoryCreator;
    handleFormSave: typeof CreateCategoryCreator;
    push: typeof push;
}

interface State {
    isCreating: boolean;
}

class CourseDetailedContent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleBodyCellClick = this.handleBodyCellClick.bind(this);
        this.handleRootClick = this.handleRootClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancelCreate = this.handleCancelCreate.bind(this);

        this.state = {
            isCreating: false,
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
            handleFormChange,
            formValues,
            handleFormSave,
            selectedCategory,
        } = this.props;

        const {
            isCreating,
        } = this.state;

        const course = courses && courses.find((value: Course) => value.title === detailedCourse);

        return (
            <div id={`${course ? course.title : ""}-detailed`} className={className}>
                <span
                    className="click-route"
                    onClick={this.handleRootClick}
                >
                    Courses >
                </span>
                <span className="route">{`> ${detailedCourse}`}</span>
                <div className="buttons">
                    <span className="button-label">Grade Category Actions:</span>
                    <Button
                        icon="add"
                        size={30}
                        onClick={this.handleCreate}
                    />
                    <Button
                        icon="create"
                        size={30}
                    />
                    <Button
                        icon="delete_sweep"
                        size={30}
                    />
                </div>
                <Divider
                    gridArea="divider"
                />
                <div className="content">
                    {
                        isCreating &&
                        <CourseCategoryForm
                            formValues={formValues}
                            course={course}
                            handleFormChange={handleFormChange}
                            handleCancelCreate={this.handleCancelCreate}
                            handleFormSave={handleFormSave}
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
                            category={selectedCategory}
                        />
                        </>
                    }
                </div>
            </div>
        );
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
            handler(category);
        }
    }

    private handleCreate() {
        this.setState({
            isCreating: true,
        });
    }

    private handleCancelCreate() {
        this.setState({
            isCreating: false,
        });
        this.props.handleFormClear();
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
    grid-template-rows: auto 1px 1fr;
    grid-template-columns: auto auto 1fr;
    grid-template-areas: "course title buttons"
                         "divider divider divider"
                         "content content content";
    grid-row-gap: 5px;
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

    .route {
        padding: 10px 0;
        color: ${(props) => props.theme.primaryText};
        grid-area: title;
        font-size: 24px;
    }

    .buttons {
        margin: auto 0;
        display: flex;
        justify-content: flex-end;
        grid-area: buttons;
    }

    .content {
        grid-area: content;
    }

    .button-label {
        font-size: 14px;
        margin: auto 0;
        color: ${(props) => props.theme.primaryText};
    }
`;
