import { List } from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AnalysisCourse } from "../../models/AnalysisCourse";
import { Course } from "../../models/Course";
import { getAnalysisGridColumns, getAnalysisGridData } from "../../state/ducks/control/analysis/selectors";
import { getCourses } from "../../state/ducks/data/courses";
import { RootState } from "../../state/rootReducer";
import AnalysisContent from "../content/AnalysisContent";
import { DataGridColumnDefinition, DataGridElement } from "../controls/data-grid";

interface PropsFromState {
    courses?: Map<string, Course>;
    elements?: List<DataGridElement<AnalysisCourse>>;
    columns?: List<DataGridColumnDefinition<AnalysisCourse>>;
}

// tslint:disable-next-line:no-empty-interface
interface PropsFromDispatch {

}

type Props = PropsFromDispatch & PropsFromState;

class ConnectedAnalysisPage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <AnalysisContent
                {...this.props}
            />
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return ({
        columns: getAnalysisGridColumns(state),
        courses: getCourses(state),
        elements: getAnalysisGridData(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedAnalysisPage);
