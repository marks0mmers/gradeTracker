import { push } from "connected-react-router";
import { Map } from "immutable";
import React, {  } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import { User } from "../../models/User";
import {
    getDetailedColumns,
    getDetailedCourseElements,
    getSelectedGradeCategory,
    SelectGradeCategoryCreator,
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import {
    CreateNewCourseCreator,
    DeleteCourseCreator,
    EditCourseCreator,
    getCourses,
} from "../../state/ducks/data/courses";
import { getCurrentUser } from "../../state/ducks/data/users";
import { RootState } from "../../state/rootReducer";
import HomeContent from "../content/HomeContent";

interface PropsFromState {
    courses: Map<string, Course>;
    selectedGradeCategory: GradeCategory;
    currentUser: User;
}

interface PropsFromDispatch {
    handleCreateNewCourse: typeof CreateNewCourseCreator;
    handleEditCourse: typeof EditCourseCreator;
    handleDeleteCourse: typeof DeleteCourseCreator;
    handleSetActiveCourse: typeof SetActiveCourseCreator;
    push: typeof push;
}

type Props = PropsFromDispatch & PropsFromState;

const ConnectedHomePage = (props: Props) => (
<HomeContent
    {...props}
/>
);

const mapStateToProps = (state: RootState) => {
    return ({
        courses: getCourses(state),
        categoryColumns: getDetailedColumns(state),
        categoryElements: getDetailedCourseElements(state),
        currentUser: getCurrentUser(state),
        selectedGradeCategory: getSelectedGradeCategory(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        handleDelectGradeCategory: SelectGradeCategoryCreator,
        handleSetActiveCourse: SetActiveCourseCreator,
        handleEditCourse: EditCourseCreator,
        handleDeleteCourse: DeleteCourseCreator,
        handleCreateNewCourse: CreateNewCourseCreator,
        push,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHomePage);
