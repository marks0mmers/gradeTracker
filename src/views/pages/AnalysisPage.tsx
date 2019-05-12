import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useActions, useSelector } from "src/state/hooks";
import styled from "styled-components";
import { analysisColumns } from "../../constants/columns/AnalysisColumns";
import { AnalysisCourse } from "../../models/AnalysisCourse";
import { getAnalysisGridData } from "../../state/ducks/control/analysis/selectors";
import { GetGradeCategoriesForCurrentUserCreator } from "../../state/ducks/data/gradeCategories";
import { RootState } from "../../state/rootReducer";
import { useComponentMount } from "../../util/Hooks";
import Divider from "../components/shared/Divider";
import DataGrid from "../controls/data-grid";

interface GraphData {
    name: string;
    Current: number;
    Guarenteed: number;
    Potential: number;
}

interface Props {
    className?: string;
}

const AnalysisPage = (props: Props) => {

    const {elements} = useSelector((state: RootState) => ({
        elements: getAnalysisGridData(state),
    }));

    const {getAllCategories} = useActions({
        getAllCategories: GetGradeCategoriesForCurrentUserCreator,
    });

    useComponentMount(() => {
        document.title = "Grades Analysis";
        getAllCategories();
    });

    const getGraphData = () => {
        const analysisCourses = elements && elements.map((value) => value && value.payload).toList();
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
                columnDefinitions={analysisColumns}
                elements={elements}
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

export default styled(AnalysisPage)`
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
