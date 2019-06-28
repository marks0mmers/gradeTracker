import { Map } from "immutable";
import React from "react";
import { match } from "react-router";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import { analysisColumns } from "../../constants/columns/AnalysisColumns";
import { AnalysisCourse } from "../../models/AnalysisCourse";
import { ViewAnalysisForUserCreator } from "../../state/ducks/control/analysis/actions";
import { getAnalysisGridData } from "../../state/ducks/control/analysis/selectors";
import { SetCoursesForUserCreator } from "../../state/ducks/data/courses/actions/SetCoursesForUser";
import { GetGradeCategoriesForCurrentUserCreator } from "../../state/ducks/data/gradeCategories";
import {
    SetGradeCategoriesForUserCreator,
} from "../../state/ducks/data/gradeCategories/actions/SetGradeCategoriesForUser";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import { useComponentMount, useComponentUpdate } from "../../util/Hooks";
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
    match: match<{userId?: string}>;
}

const AnalysisPage = (props: Props) => {

    const {elements} = useMapState((state: RootState) => ({
        elements: getAnalysisGridData(state),
    }));

    const {
        getAllCategories,
        getDataForUser,
        setCoursesForUser,
        viewAnalysis,
        setGradeCategoriesForUser,
    } = useMapDispatch({
        getAllCategories: GetGradeCategoriesForCurrentUserCreator,
        getDataForUser: ViewAnalysisForUserCreator,
        setCoursesForUser: SetCoursesForUserCreator,
        viewAnalysis: ViewAnalysisForUserCreator,
        setGradeCategoriesForUser: SetGradeCategoriesForUserCreator,
    });

    useComponentMount(() => {
        document.title = "Grades Analysis";
        if (props.match.params.userId) {
            viewAnalysis(props.match.params.userId);
            getDataForUser(props.match.params.userId);
        } else {
            getAllCategories();
        }
        return () => {
            setCoursesForUser(Map());
            setGradeCategoriesForUser(Map());
        };
    });

    useComponentUpdate(() => {
        if (!props.match.params.userId) {
            setCoursesForUser(Map());
            setGradeCategoriesForUser(Map());
            getAllCategories();
        }
    }, [props.match.params.userId]);

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
