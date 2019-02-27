import { push } from "connected-react-router";
import { Map } from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import { bindActionCreators, Dispatch } from "redux";
import { Course } from "src/models/Course";
import styled from "styled-components";
import { Theme } from "../models/Theme";
import { User } from "../models/User";
import { getActiveCourse } from "../state/ducks/control/courses";
import { GetCurrentUserCreator, LogoutCreator } from "../state/ducks/data/users";
import { getCurrentUser } from "../state/ducks/data/users/selectors";
import {
    getThemes,
    SetActiveThemeCreator,
} from "../state/ducks/session";
import { RootState } from "../state/rootReducer";
import AnalysisPage from "./pages/AnalysisPage";
import CourseDetailedPage from "./pages/CourseDetailedPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./partials/Header";
import NavBar from "./partials/NavBar";

interface PassedProps {
    className?: string;
}

interface PropsFromState {
    themes?: Map<string, Theme>;
    detailedCourse?: Course;
    location?: string;
    currentUser?: User;
}

interface PropsFromDispatch {
    setActiveTheme?: typeof SetActiveThemeCreator;
    getCurrentUser?: typeof GetCurrentUserCreator;
    logout?: typeof LogoutCreator;
    pushRoute?: typeof push;
}

type Props = PropsFromDispatch & PropsFromState & PassedProps;

class Layout extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public componentDidMount() {
        if (!this.props.currentUser) {
            const fetchCurrentUser = this.props.getCurrentUser;
            if (fetchCurrentUser && sessionStorage.getItem("jwtToken")) {
                fetchCurrentUser();
            }
            const handler = this.props.pushRoute;
            if (handler) {
                handler("/login");
            }
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const handler = this.props.pushRoute;
        if (!this.props.currentUser) {
            if (handler) {
                handler("/login");
            }
        } else {
            if (handler && this.props.currentUser !== prevProps.currentUser) {
                handler("/");
            }
        }
    }

    public render() {
        const {
            className,
            themes,
            currentUser,
            setActiveTheme,
            detailedCourse,
            pushRoute,
        } = this.props;

        return (
            <div id="layout" className={className}>
                {
                    currentUser &&
                    <>
                    <Header
                        icon="dashboard"
                        title="Gradebook"
                        themes={themes}
                        setActiveTheme={setActiveTheme}
                        currentUser={currentUser}
                        logout={this.props.logout}
                    />
                    <NavBar
                        pushRoute={pushRoute}
                    />
                    </>
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
        themes: getThemes(state),
        currentUser: getCurrentUser(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        pushRoute: push,
        setActiveTheme: SetActiveThemeCreator,
        getCurrentUser: GetCurrentUserCreator,
        logout: LogoutCreator,
    }, dispatch);
};

const connected = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default styled(connected)`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: ${(props) => props.theme.white};
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
