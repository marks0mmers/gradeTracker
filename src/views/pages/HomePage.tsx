import { push } from "connected-react-router";
import { Map } from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import {
    getActiveCourse,
    getDetailedColumns,
    getDetailedCourseElements,
    getSelectedGradeCategory,
    SelectGradeCategoryCreator,
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import { CreateNewCourseCreator, getCourses } from "../../state/ducks/data/courses";
import { RootState } from "../../state/rootReducer";
import HomeContent from "../content/HomeContent";

interface PropsFromState {
    courses?: Map<string, Course>;
    detailedCourse?: string;
    selectedGradeCategory?: GradeCategory;
}

interface PropsFromDispatch {
    handleCreateNewCourse?: typeof CreateNewCourseCreator;
    handleSetActiveCourse?: typeof SetActiveCourseCreator;
    push?: typeof push;
}

type Props = PropsFromDispatch & PropsFromState;

class ConnectedHomePage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <HomeContent
                {...this.props}
            />
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return ({
        courses: getCourses(state),
        categoryColumns: getDetailedColumns(state),
        categoryElements: getDetailedCourseElements(state),
        detailedCourse: getActiveCourse(state),
        selectedGradeCategory: getSelectedGradeCategory(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        handleDelectGradeCategory: SelectGradeCategoryCreator,
        handleSetActiveCourse: SetActiveCourseCreator,
        handleCreateNewCourse: CreateNewCourseCreator,
        push,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHomePage);
