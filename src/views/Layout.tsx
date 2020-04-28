import { push } from "connected-react-router";
import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { getCurrentUser, GetCurrentUserCreator } from "../state/ducks/data/users";
import { getPathName } from "../state/ducks/router/selectors";
import { useMapDispatch, useMapState } from "../state/hooks";
import Header from "./components/shared/Header";
import NavBar from "./components/shared/NavBar";
import { protectRoute } from "./components/shared/ProtectedRoute";
import AdminViewUsersPage from "./pages/admin/AdminViewUsersPage";
import AnalysisPage from "./pages/AnalysisPage";
import CourseDetailedPage from "./pages/CourseDetailedPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ViewRequestsPage from "./pages/ViewRequestsPage";

const Layout = () => {

    //#region Redux State
    const state = useMapState((state) => ({
        routerLocation: getPathName(state),
        currentUser: getCurrentUser(state),
    }));

    const actions = useMapDispatch({
        pushRoute: push,
        fetchCurrentUser: GetCurrentUserCreator,
    });
    //#endregion

    //#region Lifecycle Methods
    useEffect(() => {
        if (!state.currentUser && localStorage.getItem("jwtToken")) {
            actions.fetchCurrentUser();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!state.currentUser && !window.location.href.includes("/login")) {
            actions.pushRoute("/login", state.routerLocation);
        }
    }, [actions, state.currentUser, state.routerLocation]);
    //#endregion

    //#region Render Method
    return (
        <Container id="layout">
            { state.currentUser &&
                <Fragment>
                    <Header
                        title="Gradebook"
                    />
                    <NavBar
                        currentUser={state.currentUser}
                        pushRoute={actions.pushRoute}
                    />
                </Fragment>
            }
            <Switch>
                <Route
                    component={HomePage}
                    exact={true}
                    path="/"
                />
                <Route
                    component={LoginPage}
                    path="/login"
                />
                <Route
                    component={CourseDetailedPage}
                    path={"/course/:courseId"}
                />
                <Route
                    component={ViewRequestsPage}
                    path="/viewRequests"
                />
                <Route
                    component={AnalysisPage}
                    path="/analysis/:userId"
                />
                <Route
                    component={AnalysisPage}
                    path="/analysis"
                />
                {protectRoute("admin", state.currentUser)(
                    <Route
                        path="/admin"
                        component={AdminViewUsersPage}
                    />,
                )}
                <Route
                    component={HomePage}
                    path="/*"
                />
            </Switch>
            <ToastContainer
                autoClose={3000}
            />
        </Container>
    );
    //#endregion
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: 60px calc(100vw - 60px);
    grid-template-rows: 60px calc(100vh - 60px);
    grid-template-areas: "header header"
                        "navbar content";
    @media screen and (max-width: 600px) {
        grid-template-columns: 100vh;
        grid-template-rows: 60px 60px calc(100vh - 120px);
        grid-template-areas: "header"
                            "navbar"
                            "content";
    }
`;

export default Layout;
