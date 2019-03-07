import { push } from "connected-react-router";
import { List, Map} from "immutable";
import React, {  } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
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
import { CreateGradeCategoryCreator } from "../../state/ducks/data/gradeCategories";
import { getCurrentUser } from "../../state/ducks/data/users";
import { RootState } from "../../state/rootReducer";
import CourseDetailedContent from "../content/CourseDetailedContent";
import { DataGridColumnDefinition } from "../controls/data-grid";
import { DataGridElement } from "../controls/data-grid";

interface PropsFromState {
    categoryColumns: List<DataGridColumnDefinition<GradeCategory>>;
    categoryElements: List<DataGridElement<GradeCategory>>;
    course: Course;
    currentUser: User;
    categories: Map<string, GradeCategory>;
    detailedCourse: string;
    formValues: Map<string, string>;
    selectedCategory: string;
}

interface PropsFromDispatch {
    setActiveCourse: typeof SetActiveCourseCreator;
    selectGradeCategory: typeof SelectGradeCategoryCreator;
    createGradeCategory: typeof CreateGradeCategoryCreator;
    push: typeof push;
}

type Props = PropsFromDispatch & PropsFromState;

const ConnectedHomePage = (props: Props) => (
    <CourseDetailedContent
        {...props}
    />
);

const mapStateToProps = (state: RootState) => {
    return ({
        categoryColumns: getDetailedColumns(state),
        categoryElements: getDetailedCourseElements(state),
        detailedCourse: getActiveCourse(state),
        selectedCategory: getSelectedGradeCategory(state),
        currentUser: getCurrentUser(state),
        course: getActiveCourse(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        push,
        selectGradeCategory: SelectGradeCategoryCreator,
        setActiveCourse: SetActiveCourseCreator,
        createGradeCategory: CreateGradeCategoryCreator,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHomePage);
