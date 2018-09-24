import { push } from "connected-react-router";
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
import {
    getFileName,
    getFilePath,
    getThemes,
    SetActiveFileCreator,
    SetActiveThemeCreator,
} from "../state/ducks/session";
import { RootState } from "../state/rootReducer";
import AnalysisPage from "./pages/AnalysisPage";
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
    fileName?: string;
    filePath?: string;
}

interface PropsFromDispatch {
    setActiveFile?: typeof SetActiveFileCreator;
    setActiveTheme?: typeof SetActiveThemeCreator;
    setCourses?: typeof SetCoursesCreator;
    clearCourses?: typeof ClearCoursesCreator;
    pushRoute?: typeof push;
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
            setActiveFile,
            setActiveTheme,
            detailedCourse,
            courses,
            setCourses,
            clearCourses,
            fileName,
            filePath,
            pushRoute,
        } = this.props;

        return (
            <div id="layout" className={className}>
                <Header
                    icon="dashboard"
                    title="Gradebook"
                    themes={themes}
                    setActiveTheme={setActiveTheme}
                    setActiveFile={setActiveFile}
                    courses={courses}
                    setCourses={setCourses}
                    clearCourses={clearCourses}
                    fileName={fileName}
                    filePath={filePath}
                />
                <NavBar
                    pushRoute={pushRoute}
                />
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
                        component={AnalysisPage}
                        path="/analysis"
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
        fileName: getFileName(state),
        filePath: getFilePath(state),
        location: state.router.location.pathname,
        themes: getThemes(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        clearCourses: ClearCoursesCreator,
        pushRoute: push,
        setActiveFile: SetActiveFileCreator,
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
