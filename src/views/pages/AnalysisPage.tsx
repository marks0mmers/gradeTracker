import { List, Map } from "immutable";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { bindActionCreators, Dispatch } from "redux";
import { getAnalysisGridColumns, getAnalysisGridData } from "src/state/ducks/control/analysis/selectors";
import { getCourses } from "src/state/ducks/data/courses";
import { GetGradeCategoriesForCurrentUserCreator } from "src/state/ducks/data/gradeCategories";
import { RootState } from "src/state/rootReducer";
import styled from "styled-components";
import { AnalysisCourse } from "../../models/AnalysisCourse";
import { Course } from "../../models/Course";
import Divider from "../components/Divider";
import DataGrid, { DataGridColumnDefinition, DataGridElement } from "../controls/data-grid";

interface GraphData {
    name: string;
    Current: number;
    Guarenteed: number;
    Potential: number;
}

interface PassedProps {
    className?: string;
}

interface PropsFromState {
    courses: Map<string, Course>;
    elements: List<DataGridElement<AnalysisCourse>>;
    columns: List<DataGridColumnDefinition<AnalysisCourse>>;
}

interface PropsFromDispatch {
    getAllCategories: typeof GetGradeCategoriesForCurrentUserCreator;
}

type Props = PropsFromState & PropsFromDispatch & PassedProps;

const AnalysisPage = (props: Props) => {

    // componentDidMount
    useEffect(() => {
        props.getAllCategories();
    }, []);

    const getGraphData = () => {
        const analysisCourses = props.elements
            && props.elements.map((value: DataGridElement<AnalysisCourse>) => value.payload).toList();
        return analysisCourses && analysisCourses.map((value: AnalysisCourse) => {
            return {
                Current: value.currentGPA,
                Guarenteed: value.guarenteedGPA,
                Potential: value.potentialGPA,
                name: value.title,
            } as GraphData;
        }).toArray();
    };

    return (
        <div className={props.className}>
            <h2
                className="route"
            >
                Analysis
            </h2>
            <Divider isVertical={false} gridArea="divider"/>
            <DataGrid
                id="analysis-grid"
                gridArea="grid"
                rowHeight={30}
                columnDefinitions={props.columns}
                elements={props.elements}
            />
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getGraphData()}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="name"
                        tick={{fill: "#000"}}
                    />
                    <YAxis
                        tick={{fill: "#000"}}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Current" fill="#8884d8" />
                    <Bar dataKey="Guarenteed" fill="#84a9af" />
                    <Bar dataKey="Potential" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    columns: getAnalysisGridColumns(state),
    courses: getCourses(state),
    elements: getAnalysisGridData(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        getAllCategories: GetGradeCategoriesForCurrentUserCreator,
    }, dispatch);
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(AnalysisPage))`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr 1fr;
    grid-template-areas: "subheader"
                         "divider"
                         "grid"
                         "graph";

    .route {
        padding: 10px;
        margin-left: 10px;
        cursor: default;
    }
`;
