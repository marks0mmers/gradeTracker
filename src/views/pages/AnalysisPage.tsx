import { List, Map } from "immutable";
import React, {  } from "react";
import { connect } from "react-redux";
import { AnalysisCourse } from "../../models/AnalysisCourse";
import { Course } from "../../models/Course";
import { getAnalysisGridColumns, getAnalysisGridData } from "../../state/ducks/control/analysis/selectors";
import { getCourses } from "../../state/ducks/data/courses";
import { RootState } from "../../state/rootReducer";
import AnalysisContent from "../content/AnalysisContent";
import { DataGridColumnDefinition, DataGridElement } from "../controls/data-grid";

interface PropsFromState {
    courses: Map<string, Course>;
    elements: List<DataGridElement<AnalysisCourse>>;
    columns: List<DataGridColumnDefinition<AnalysisCourse>>;
}

type Props = & PropsFromState;

const ConnectedAnalysisPage = (props: Props) => (
    <AnalysisContent
        {...props}
    />
);

const mapStateToProps = (state: RootState) => {
    return ({
        columns: getAnalysisGridColumns(state),
        courses: getCourses(state),
        elements: getAnalysisGridData(state),
    });
};

export default connect(mapStateToProps)(ConnectedAnalysisPage);
