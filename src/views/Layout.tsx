import { push } from "connected-react-router";
import React, { Fragment } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { getCurrentUser, GetCurrentUserCreator, LogoutCreator } from "../state/ducks/data/users";
import { getPathName } from "../state/ducks/router/selectors";
import { useMapDispatch, useMapState } from "../state/hooks";
import { useComponentMount, useComponentUpdate } from "../util/Hooks";
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
        logout: LogoutCreator,
    });
    //#endregion

    //#region Lifecycle Methods
    useComponentMount(() => {
        if (!state.currentUser && sessionStorage.getItem("jwtToken")) {
            actions.fetchCurrentUser();
        }
    });

    useComponentUpdate(() => {
        if (!state.currentUser && !window.location.href.includes("/login")) {
            actions.pushRoute("/login", state.routerLocation);
        }
    });
    //#endregion

    //#region Render Method
    return (
        <Container id="layout">
            { state.currentUser &&
                <Fragment>
                    <Header
                        title="Gradebook"
                        currentUser={state.currentUser}
                        logout={actions.logout}
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
                    path={"/course/:courseTitle"}
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
