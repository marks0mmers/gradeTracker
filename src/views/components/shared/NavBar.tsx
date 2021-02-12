import { useCallback, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Role } from "../../../models/Role";
import NavButton from "./NavButton";
import { useMapState } from "../../../state/hooks";
import { getCurrentUser } from "../../../state/ducks/data/users/selectors";

enum Routes {
    COURSE_OVERVIEW = "/",
    ANALYSIS = "/analysis",
    VIEW_REQUESTS = "/viewRequests",
    CALENDAR = "/calendar",
    ADMIN = "/admin",
}

const NavBar = () => {
    const { push } = useHistory();

    const [activeButton, setActiveButton] = useState<Routes>(Routes.COURSE_OVERVIEW);

    const appState = useMapState(state => ({
        currentUser: getCurrentUser(state),
    }));

    const handleNavClick = useCallback((id: string) => {
        setActiveButton(id as Routes);
        push(id);
    }, [push]);

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
                appState.currentUser?.roles.some((role: Role) => role.role === "admin") &&
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
