import { push } from "connected-react-router";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";
import { Course } from "../models/Course";
import { User } from "../models/User";
import { getActiveCourse } from "../state/ducks/control/courses";
import { getCurrentUser, GetCurrentUserCreator, LogoutCreator } from "../state/ducks/data/users";
import { RootState } from "../state/rootReducer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AnalysisPage from "./pages/AnalysisPage";
import CourseDetailedPage from "./pages/CourseDetailedPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

interface PassedProps {
    className?: string;
}

interface PropsFromState {
    detailedCourse: Course;
    location: string;
    currentUser: User;
}

interface PropsFromDispatch {
    fetchCurrentUser: typeof GetCurrentUserCreator;
    logout: typeof LogoutCreator;
    pushRoute: typeof push;
}

type Props = PropsFromDispatch & PropsFromState & PassedProps;

const Layout = (props: Props) => {

    useEffect(() => {
        if (!props.currentUser && sessionStorage.getItem("jwtToken")) {
            props.fetchCurrentUser();
        }
    }, []);

    useEffect(() => {
        if (!props.currentUser) {
            props.pushRoute("/login");
        }
    });

    return (
        <div id="layout" className={props.className}>
            { props.currentUser &&
                <Fragment>
                    <Header
                        icon="dashboard"
                        title="Gradebook"
                        currentUser={props.currentUser}
                        logout={props.logout}
                    />
                    <NavBar
                        pushRoute={props.pushRoute}
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
                    path={`/${props.detailedCourse && props.detailedCourse.title}`}
                />
                <Route
                    component={AnalysisPage}
                    path="/analysis"
                />
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

const mapStateToProps = (state: RootState) => {
    return ({
        detailedCourse: getActiveCourse(state),
        location: state.router.location.pathname,
        currentUser: getCurrentUser(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        pushRoute: push,
        fetchCurrentUser: GetCurrentUserCreator,
        logout: LogoutCreator,
    }, dispatch);
};

const connected = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default styled(connected)`
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
