import { push } from "connected-react-router";
import { List, Map} from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Course } from "../../models/Course";
import { GradeCategory } from "../../models/GradeCategory";
import {
    CreateCategoryFormChangeCreator,
    CreateCategoryFormClearCreator,
    getActiveCourse,
    getCategoryFormValues,
    getDetailedColumns,
    getDetailedCourseElements,
    getSelectedGradeCategory,
    SelectGradeCategoryCreator,
    SetActiveCourseCreator,
} from "../../state/ducks/control/courses";
import {
    CreateCategoryCreator, getCourses,
} from "../../state/ducks/data/courses";
import { RootState } from "../../state/rootReducer";
import CourseDetailedContent from "../content/CourseDetailedContent";
import { DataGridColumnDefinition } from "../controls/data-grid";
import { DataGridElement } from "../controls/data-grid";

interface PropsFromState {
    categoryColumns: List<DataGridColumnDefinition<GradeCategory>>;
    categoryElements: List<DataGridElement<GradeCategory>>;
    courses: List<Course>;
    detailedCourse: string;
    formValues: Map<string, string>;
    selectedCategory?: GradeCategory;
}

interface PropsFromDispatch {
    setActiveCourse: typeof SetActiveCourseCreator;
    selectGradeCategory: typeof SelectGradeCategoryCreator;
    handleFormChange: typeof CreateCategoryFormChangeCreator;
    handleFormClear: typeof CreateCategoryFormClearCreator;
    handleFormSave: typeof CreateCategoryCreator;
    push: typeof push;
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
        courses: getCourses(state),
        detailedCourse: getActiveCourse(state),
        formValues: getCategoryFormValues(state),
        selectedCategory: getSelectedGradeCategory(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        handleFormChange: CreateCategoryFormChangeCreator,
        handleFormClear: CreateCategoryFormClearCreator,
        handleFormSave: CreateCategoryCreator,
        push,
        selectGradeCategory: SelectGradeCategoryCreator,
        setActiveCourse: SetActiveCourseCreator,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHomePage);
