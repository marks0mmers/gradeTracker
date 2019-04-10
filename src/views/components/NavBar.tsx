import { push } from "connected-react-router";
import React, { Component } from "react";
import styled from "styled-components";
import NavButton from "../components/NavButton";

enum Routes {
    COURSE_OVERVIEW = "/",
    ANALYSIS = "/analysis",
}

interface Props {
    className?: string;

    pushRoute: typeof push;
}

interface State {
    activeButton: Routes;
}

class NavBar extends Component<Props, State> {

    public readonly state = {
        activeButton: Routes.COURSE_OVERVIEW,
    };

    public render() {
        return (
            <div id="nav-bar" className={this.props.className}>
                <NavButton
                    id={Routes.COURSE_OVERVIEW}
                    iconName="view_agenda"
                    activeButton={this.state.activeButton}
                    onClick={this.handleNavClick}
                />
                <NavButton
                    id={Routes.ANALYSIS}
                    iconName="equalizer"
                    activeButton={this.state.activeButton}
                    onClick={this.handleNavClick}
                />
            </div>
        );
    }

    private handleNavClick = (id: string) => {
        this.setState({
            activeButton: id as Routes,
        });
        this.props.pushRoute(id);
    }
}

export default styled(NavBar)`
    background: #5f6366;
    grid-area: navbar;
    display: grid;
    grid-template-rows: 60px 60px;
    @media screen and (max-width: 600px) {
        grid-template-columns: 60px 60px;
    }
`;
