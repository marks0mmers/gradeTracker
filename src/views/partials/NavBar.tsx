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

    pushRoute?: typeof push;
}

interface State {
    activeButton: Routes;
}

class NavBar extends Component<Props, State> {

    public state = {
        activeButton: Routes.COURSE_OVERVIEW,
    };

    public render() {
        const {
            className,
        } = this.props;
        const {
            activeButton,
        } = this.state;

        return (
            <div id="nav-bar" className={className}>
                <NavButton
                    id={Routes.COURSE_OVERVIEW}
                    iconName="view_agenda"
                    activeButton={activeButton}
                    onClick={this.handleNavClick}
                />
                <NavButton
                    id={Routes.ANALYSIS}
                    iconName="equalizer"
                    activeButton={activeButton}
                    onClick={this.handleNavClick}
                />
            </div>
        );
    }

    private handleNavClick = (id: string) => {
        const handler = this.props.pushRoute;
        this.setState({
            activeButton: id as Routes,
        });
        if (handler) {
            handler(id);
        }
    }
}

export default styled(NavBar)`
    background: ${(props) => props.theme.secondary};
    grid-area: navbar;
    display: grid;
    grid-template-rows: 60px 60px;
    @media screen and (max-width: 600px) {
        grid-template-columns: 60px 60px;
    }
`;
