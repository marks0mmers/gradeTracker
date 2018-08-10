import * as React from "react";
import styled from "styled-components";
import NavButton from "../components/NavButton";

enum Routes {
    COURSE_OVERVIEW = "course-overview",
    ANALYSIS = "analysis",
}

interface Props {
    className?: string;
}

interface State {
    activeButton: Routes;
}

class NavBar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleNavClick = this.handleNavClick.bind(this);

        this.state = {
            activeButton: Routes.COURSE_OVERVIEW,
        };
    }

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

    private handleNavClick(id: string) {
        this.setState({
            activeButton: id as Routes,
        });
    }
}

export default styled(NavBar)`
    background: ${(props) => props.theme.secondary}
    grid-area: navbar;
    display: grid;
    grid-template-rows: 60px 60px;
    @media screen and (max-width: 600px) {
        grid-template-columns: 60px 60px;
    }
`;
