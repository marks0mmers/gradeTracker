import { push } from "connected-react-router";
import { List, Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import {
    SelectGradeCategoryCreator,
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
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
    course?: Course;
    categories?: Map<string, GradeCategory>;
    categoryColumns?: List<DataGridColumnDefinition<GradeCategory>>;
    categoryElements?: List<DataGridElement<GradeCategory>>;
    selectedCategory?: string;

    setActiveCourse?: typeof SetActiveCourseCreator;
    selectGradeCategory?: typeof SelectGradeCategoryCreator;
    push?: typeof push;
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
                        <>
                        <Divider
                            isVertical={false}
                            top={10}
                            bottom={10}
                        />
                        <CategoryDetailedPane
                            selectedCategory={categories && categories.get(selectedCategory)}
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
            // reimplement this
        }
        if (isEditing) {
            // reimplement this
        }
    }

    private handleBodyCellClick(
        event: React.MouseEvent<HTMLDivElement>,
        payload: GradeCategory,
        props: BodyCellProps,
    ) {
        const handler = this.props.selectGradeCategory;
        const { categories } = this.props;
        if (handler && payload.title !== "Total") {
            const category = categories && categories.find((value: GradeCategory) => {
                return value.id === payload.id;
            });
            if (category) {
                handler(category.id);
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
        // reimplement this
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
        if (this.props.push) {
            this.props.push("/");
        }
    }

}

export default styled(CourseDetailedContent)`
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    grid-template-columns: auto auto 1fr;
    grid-template-areas: "course buttons buttons"
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
            color: ${(props) => props.theme.primaryTextHover}
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
