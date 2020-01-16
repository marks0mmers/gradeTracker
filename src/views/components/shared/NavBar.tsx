import { push } from "connected-react-router";
import React, { useCallback, useState } from "react";
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

const NavBar = ({pushRoute, ...props}: Props) => {

    //#region Component State
    const [activeButton, setActiveButton] = useState<Routes>(Routes.COURSE_OVERVIEW);
    //#endregion

    //#region Private Methods
    const handleNavClick = useCallback((id: string) => {
        setActiveButton(id as Routes);
        pushRoute(id);
    }, [pushRoute]);
    //#endregion

    //#region Render Method
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
                props.currentUser?.roles.some((role: Role) => role.role === "admin") &&
                <NavButton
                    id={Routes.ADMIN}
                    iconName="account_box"
                    activeButton={activeButton}
                    onClick={handleNavClick}
                />
            }
        </NavBarContainer>
    );
    //#endregion
};

//#region Styles
const NavBarContainer = styled.div`
    background: #5f6366;
    grid-area: navbar;
    display: grid;
    grid-template-rows: 60px 60px 60px 60px;
    @media screen and (max-width: 600px) {
        grid-template-columns: 60px 60px 60px 60px;
    }
`;
//#endregion

export default NavBar;
