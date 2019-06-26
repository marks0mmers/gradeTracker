import { push } from "connected-react-router";
import React, { Fragment } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { getActiveCourse } from "../state/ducks/control/courses";
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

interface Props {
    className?: string;
}

const Layout = (props: Props) => {

    const {detailedCourse, routerLocation, currentUser} = useMapState((state) => ({
        detailedCourse: getActiveCourse(state),
        routerLocation: getPathName(state),
        currentUser: getCurrentUser(state),
    }));

    const {fetchCurrentUser, logout, pushRoute} = useMapDispatch({
        pushRoute: push,
        fetchCurrentUser: GetCurrentUserCreator,
        logout: LogoutCreator,
    });

    useComponentMount(() => {
        if (!currentUser && sessionStorage.getItem("jwtToken")) {
            fetchCurrentUser();
        }
    });

    useComponentUpdate(() => {
        if (!currentUser && !window.location.href.includes("/login")) {
            pushRoute("/login", routerLocation);
        }
    });

    return (
        <div id="layout" className={props.className}>
            { currentUser &&
                <Fragment>
                    <Header
                        title="Gradebook"
                        currentUser={currentUser}
                        logout={logout}
                    />
                    <NavBar
                        pushRoute={pushRoute}
                        currentUser={currentUser}
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
                    path={`/${detailedCourse && detailedCourse.title}`}
                />
                <Route
                    component={ViewRequestsPage}
                    path="/viewRequests"
                />
                <Route
                    component={AnalysisPage}
                    path="/analysis"
                />
                {protectRoute("admin", currentUser)(
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
        </div>
    );
};

export default styled(Layout)`
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
