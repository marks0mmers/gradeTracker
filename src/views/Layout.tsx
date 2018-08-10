import { Map } from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";
import { Course } from "../models/Course";
import { Theme } from "../models/Theme";
import { getActiveCourse } from "../state/ducks/control/courses";
import { ClearCoursesCreator, getCourses, SetCoursesCreator } from "../state/ducks/data/courses";
import { SetActiveThemeCreator } from "../state/ducks/session/actions";
import { getThemes } from "../state/ducks/session/selectors";
import { RootState } from "../state/rootReducer";
import CourseDetailedPage from "./pages/CourseDetailedPage";
import HomePage from "./pages/HomePage";
import Header from "./partials/Header";
import NavBar from "./partials/NavBar";

interface PassedProps {
    className?: string;
}

interface PropsFromState {
    themes?: Map<string, Theme>;
    detailedCourse?: string;
    location?: string;
    courses?: Map<string, Course>;
}

interface PropsFromDispatch {
    setActiveTheme: typeof SetActiveThemeCreator;
    setCourses: typeof SetCoursesCreator;
    clearCourses: typeof ClearCoursesCreator;
}

type Props = PropsFromDispatch & PropsFromState & PassedProps;

class Layout extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
            themes,
            setActiveTheme,
            detailedCourse,
            courses,
            setCourses,
            clearCourses,
        } = this.props;

        return (
            <div id="layout" className={className}>
                <Header
                    icon="dashboard"
                    title="Gradebook"
                    themes={themes}
                    setActiveTheme={setActiveTheme}
                    courses={courses}
                    setCourses={setCourses}
                    clearCourses={clearCourses}
                />
                <NavBar />
                <Switch>
                    <Route
                        component={HomePage}
                        exact={true}
                        path="/"
                    />
                    <Route
                        component={CourseDetailedPage}
                        path={`/${detailedCourse}`}
                    />
                    <Route
                        component={HomePage}
                        path="/*"
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return ({
        courses: getCourses(state),
        detailedCourse: getActiveCourse(state),
        location: state.router.location.pathname,
        themes: getThemes(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        clearCourses: ClearCoursesCreator,
        setActiveTheme: SetActiveThemeCreator,
        setCourses: SetCoursesCreator,
    }, dispatch);
};

const connected = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default styled(connected)`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas: "header header"
                         "navbar content";
    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-template-rows: 60px 60px 1fr;
        grid-template-areas: "header"
                             "navbar"
                             "content";
    }
`;
