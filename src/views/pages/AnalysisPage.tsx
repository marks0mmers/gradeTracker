import { Map } from "immutable";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import ActivityLoading from "../components/shared/LoadingMask";
import { analysisColumns } from "../../constants/columns/AnalysisColumns";
import { ViewAnalysisForUserCreator } from "../../state/ducks/data/analysis/actions";
import { getAnalysisGridData, getAnalysisGridDataForUser } from "../../state/ducks/data/analysis/selectors";
import { SetCoursesForUserCreator } from "../../state/ducks/data/courses/actions/SetCoursesForUser";
import { GetGradeCategoriesForCurrentUserCreator } from "../../state/ducks/data/gradeCategories";
import {
    SetGradeCategoriesForUserCreator,
} from "../../state/ducks/data/gradeCategories/actions/SetGradeCategoriesForUser";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
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
}

const AnalysisPage = (props: Props) => {

    const { userId } = useParams<{userId?: string}>();

    const appState = useMapState((state: RootState) => ({
        isLoading: getIsLoading(state),
        elements: userId ? getAnalysisGridDataForUser(state) : getAnalysisGridData(state),
    }));

    const dispatch = useMapDispatch({
        getAllCategories: GetGradeCategoriesForCurrentUserCreator,
        getDataForUser: ViewAnalysisForUserCreator,
        setCoursesForUser: SetCoursesForUserCreator,
        viewAnalysis: ViewAnalysisForUserCreator,
        setGradeCategoriesForUser: SetGradeCategoriesForUserCreator,
    });

    useEffect(() => {
        document.title = "Grades Analysis";
        if (userId) {
            dispatch.viewAnalysis(userId);
            dispatch.getDataForUser(userId);
        } else {
            dispatch.getAllCategories();
        }
        return () => {
            dispatch.setCoursesForUser(Map());
            dispatch.setGradeCategoriesForUser(Map());
        };
    }, [dispatch, userId]);

    const getGraphData = useCallback(() => {
        const analysisCourses = appState.elements.map((value) => value && value.payload);
        return analysisCourses.map((value): GraphData => ({
            Current: value.currentGPA,
            Guarenteed: value.guarenteedGPA,
            Potential: value.potentialGPA,
            name: value.title,
        })).toArray();
    }, [appState.elements]);

    return (
        <>
        { appState.isLoading && <ActivityLoading /> }
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
                elements={appState.elements}
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
};

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

export default AnalysisPage;
