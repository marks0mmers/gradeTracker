import { push } from "connected-react-router";
import { List, Map} from "immutable";
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
import { RootState } from "../../state/rootReducer";
import CourseDetailedContent from "../content/CourseDetailedContent";
import { DataGridColumnDefinition } from "../controls/data-grid";
import { DataGridElement } from "../controls/data-grid";

interface PropsFromState {
    categoryColumns?: List<DataGridColumnDefinition<GradeCategory>>;
    categoryElements?: List<DataGridElement<GradeCategory>>;
    course?: Course;
    categories?: Map<string, GradeCategory>;
    detailedCourse?: string;
    formValues?: Map<string, string>;
    selectedCategory?: string;
}

interface PropsFromDispatch {
    push?: typeof push;
}

type Props = PropsFromDispatch & PropsFromState;

class ConnectedHomePage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <CourseDetailedContent
                {...this.props}
            />
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return ({
        categoryColumns: getDetailedColumns(state),
        categoryElements: getDetailedCourseElements(state),
        detailedCourse: getActiveCourse(state),
        selectedCategory: getSelectedGradeCategory(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        push,
        selectGradeCategory: SelectGradeCategoryCreator,
        setActiveCourse: SetActiveCourseCreator,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHomePage);
