import * as React from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Theme } from "../../models/Theme";
import { getActiveTheme } from "../../state/ducks/session/selectors";
import { RootState } from "../../state/rootReducer";

interface ConnectedThemeProviderProps {
    children?: React.ReactNode;
}

interface PropsFromState {
    theme?: Theme;
}

type Props = ConnectedThemeProviderProps & PropsFromState;

const ConnectedThemeProvider = (props: Props) => {
    return (
        <ThemeProvider theme={props.theme}>
            {props.children}
        </ThemeProvider>
    );
};

const mapStateToProps = (state: RootState) => ({
    theme: getActiveTheme(state),
});

export default connect(mapStateToProps, {})(ConnectedThemeProvider);
