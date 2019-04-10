import { push } from "connected-react-router";
import React, { Component, Fragment } from "react";
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

class Layout extends Component<Props> {

    public componentDidMount() {
        if (!this.props.currentUser) {
            const { fetchCurrentUser } = this.props;
            if (sessionStorage.getItem("jwtToken")) {
                fetchCurrentUser();
            }
        }
    }

    public componentDidUpdate(prevProps: Props) {
        if (!this.props.currentUser) {
            this.props.pushRoute("/login");
        }
    }

    public render() {
        const {
            className,
            currentUser,
            detailedCourse,
            pushRoute,
        } = this.props;

        return (
            <div id="layout" className={className}>
                { currentUser &&
                    <Fragment>
                        <Header
                            icon="dashboard"
                            title="Gradebook"
                            currentUser={currentUser}
                            logout={this.props.logout}
                        />
                        <NavBar
                            pushRoute={pushRoute}
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
    }
}

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
