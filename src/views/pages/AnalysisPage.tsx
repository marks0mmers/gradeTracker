import { Map } from "immutable";
import React, { useCallback } from "react";
import { match } from "react-router";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import ActivityLoading from "../components/shared/LoadingMask";
import { analysisColumns } from "../../constants/columns/AnalysisColumns";
import { AnalysisCourse } from "../../models/AnalysisCourse";
import { ViewAnalysisForUserCreator } from "../../state/ducks/control/analysis/actions";
import { getAnalysisGridData, getAnalysisGridDataForUser } from "../../state/ducks/control/analysis/selectors";
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
import { getIsLoading } from "../../state/ducks/control/loadingmask/selectors";

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

    //#region Redux State
    const state = useMapState((state: RootState) => ({
        isLoading: getIsLoading(state),
        elements: props.match.params.userId ? getAnalysisGridDataForUser(state) : getAnalysisGridData(state),
    }));

    const actions = useMapDispatch({
        getAllCategories: GetGradeCategoriesForCurrentUserCreator,
        getDataForUser: ViewAnalysisForUserCreator,
        setCoursesForUser: SetCoursesForUserCreator,
        viewAnalysis: ViewAnalysisForUserCreator,
        setGradeCategoriesForUser: SetGradeCategoriesForUserCreator,
    });
    //#endregion

    //#region Lifecycle Methods
    useComponentMount(() => {
        document.title = "Grades Analysis";
        if (props.match.params.userId) {
            actions.viewAnalysis(props.match.params.userId);
            actions.getDataForUser(props.match.params.userId);
        } else {
            actions.getAllCategories();
        }
        return () => {
            actions.setCoursesForUser(Map());
            actions.setGradeCategoriesForUser(Map());
        };
    });

    useComponentUpdate(() => {
        actions.setCoursesForUser(Map());
        actions.setGradeCategoriesForUser(Map());
        actions.getAllCategories();
    }, [props.match.params.userId]);
    //#endregion

    //#region Display Methods
    const getGraphData = useCallback(() => {
        const analysisCourses = state.elements.map((value) => value && value.payload).toList();
        return analysisCourses && analysisCourses.map((value: AnalysisCourse): GraphData => ({
            Current: value.currentGPA,
            Guarenteed: value.guarenteedGPA,
            Potential: value.potentialGPA,
            name: value.title,
        })).toArray();
    }, [state.elements]);
    //#endregion

    //#region Render Method
    return (
        <>
        { state.isLoading && <ActivityLoading /> }
        <Container id="analysis-page">
            <Route id="route">
                Analysis
            </Route>
            <Divider isVertical={false} gridArea="divider"/>
            <DataGrid
                id="analysis-grid"
                gridArea="grid"
                rowHeight={30}
                columnDefinitions={analysisColumns}
                elements={state.elements}
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
        </Container>
        </>
    );
    //#endregion
};

//#region Styles
const Route = styled.h2`
    padding: 10px;
    margin-left: 10px;
    cursor: default;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr 1fr;
    grid-template-areas: "subheader"
                        "divider"
                        "grid"
                        "graph";
`;
//#endregion

export default AnalysisPage;
