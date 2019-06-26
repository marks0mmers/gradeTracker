import { push } from "connected-react-router";
import React, { useState } from "react";
import styled from "styled-components";
import { Role } from "../../../models/Role";
import { User } from "../../../models/User";
import NavButton from "./NavButton";

enum Routes {
    COURSE_OVERVIEW = "/",
    ANALYSIS = "/analysis",
    VIEW_REQUESTS = "/viewRequests",
    CALENDAR = "/calendar",
    ADMIN = "/admin",
}

interface Props {
    currentUser?: User;

    pushRoute: typeof push;
}

const NavBar = (props: Props) => {

    const [activeButton, setActiveButton] = useState<Routes>(Routes.COURSE_OVERVIEW);

    const handleNavClick = (id: string) => {
        setActiveButton(id as Routes);
        props.pushRoute(id);
    };

    return (
        <NavBarContainer id="nav-bar" >
            <NavButton
                id={Routes.COURSE_OVERVIEW}
                iconName="view_agenda"
                activeButton={activeButton}
                onClick={handleNavClick}
            />
            <NavButton
                id={Routes.ANALYSIS}
                iconName="equalizer"
                activeButton={activeButton}
                onClick={handleNavClick}
            />
            <NavButton
                id={Routes.VIEW_REQUESTS}
                iconName="group"
                activeButton={activeButton}
                onClick={handleNavClick}
            />
            {
                props.currentUser && props.currentUser.roles.some((role: Role) => role.role === "admin") &&
                <NavButton
                    id={Routes.ADMIN}
                    iconName="account_box"
                    activeButton={activeButton}
                    onClick={handleNavClick}
                />
            }
        </NavBarContainer>
    );
};

const NavBarContainer = styled.div`
    background: #5f6366;
    grid-area: navbar;
    display: grid;
    grid-template-rows: 60px 60px 60px 60px;
    @media screen and (max-width: 600px) {
        grid-template-columns: 60px 60px 60px 60px;
    }
`;

export default NavBar;
