import { push } from "connected-react-router";
import React, { useState } from "react";
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

const NavBar = (props: Props) => {

    const [state, setState] = useState<State>({
        activeButton: Routes.COURSE_OVERVIEW,
    });

    const handleNavClick = (id: string) => {
        setState({
            activeButton: id as Routes,
        });
        props.pushRoute(id);
    };

    return (
        <div id="nav-bar" className={props.className}>
            <NavButton
                id={Routes.COURSE_OVERVIEW}
                iconName="view_agenda"
                activeButton={state.activeButton}
                onClick={handleNavClick}
            />
            <NavButton
                id={Routes.ANALYSIS}
                iconName="equalizer"
                activeButton={state.activeButton}
                onClick={handleNavClick}
            />
        </div>
    );
};

export default styled(NavBar)`
    background: #5f6366;
    grid-area: navbar;
    display: grid;
    grid-template-rows: 60px 60px;
    @media screen and (max-width: 600px) {
        grid-template-columns: 60px 60px;
    }
`;
