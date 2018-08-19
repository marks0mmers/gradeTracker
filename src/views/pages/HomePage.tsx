import { push } from "connected-react-router";
import { List } from "immutable";
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
import {
    CreateCourseCreator,
    DeleteCourseCreator,
    getCourses,
    UpdateCourseCreator,
} from "../../state/ducks/data/courses";
import { RootState } from "../../state/rootReducer";
import HomeContent from "../content/HomeContent";

interface PropsFromState {
    courses?: List<Course>;
    detailedCourse?: string;
    selectedGradeCategory?: GradeCategory;
}

interface PropsFromDispatch {
    handleCreateCourse?: typeof CreateCourseCreator;
    handleUpdateCourse?: typeof UpdateCourseCreator;
    handleDeleteCourse?: typeof DeleteCourseCreator;
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
        categoryColumns: getDetailedColumns(state),
        categoryElements: getDetailedCourseElements(state),
        courses: getCourses(state),
        detailedCourse: getActiveCourse(state),
        selectedGradeCategory: getSelectedGradeCategory(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        handleCreateCourse: CreateCourseCreator,
        handleDelectGradeCategory: SelectGradeCategoryCreator,
        handleDeleteCourse: DeleteCourseCreator,
        handleSetActiveCourse: SetActiveCourseCreator,
        handleUpdateCourse: UpdateCourseCreator,
        push,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHomePage);
