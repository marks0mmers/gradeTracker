import React, { ReactChildren } from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Theme } from "../../models/Theme";
import { getActiveTheme } from "../../state/ducks/session/selectors";
import { RootState } from "../../state/rootReducer";

interface ConnectedThemeProviderProps {
    children?: ReactChildren;
}

interface PropsFromState {
    theme: Theme;
}

type Props = ConnectedThemeProviderProps & PropsFromState;

const ConnectedThemeProvider = (props: Props) => (
    <ThemeProvider theme={props.theme}>
        {props.children}
    </ThemeProvider>
);

const mapStateToProps = (state: RootState) => ({
    theme: getActiveTheme(state),
});

export default connect(mapStateToProps, {})(ConnectedThemeProvider);
