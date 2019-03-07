import { Map } from "immutable";
import React, { ChangeEvent, Component } from "react";
import styled from "styled-components";
import { Theme } from "../../models/Theme";
import { User } from "../../models/User";
import { LogoutCreator } from "../../state/ducks/data/users";
import { SetActiveThemeCreator } from "../../state/ducks/session";
import Button from "../controls/button/Button";

const ThemeSelector = styled.div`
    display: flex;
    justify-content: center;
    height: 40px;
    margin: 10px;
    min-width: 100px;
    background: ${(props) => props.theme.tertiary};
    .theme-selector {
        width: 80px;
        margin: auto;
    }
`;

interface Props {
    className?: string;
    icon?: string;
    title?: string;
    themes?: Map<string, Theme>;
    currentUser?: User;

    setActiveTheme?: typeof SetActiveThemeCreator;
    logout?: typeof LogoutCreator;
}

class Header extends Component<Props> {

    public render() {
        const {
            className,
            title,
            themes,
            currentUser,
        } = this.props;

        return (
            <div id="header" className={className}>
                {title && <span className="title">{title}</span>}
                <div />
                <span className="current-user">
                    {`${currentUser && currentUser.firstName} ${currentUser && currentUser.lastName}`}
                </span>
                <Button
                    text="Logout"
                    onClick={this.props.logout}
                    height={40}
                    marginLeftRight={10}
                    marginTopBottom={10}
                    width={100}
                />
                <ThemeSelector>
                    <select
                        className="theme-selector"
                        onChange={this.handleThemeChange}
                    >
                        {
                            themes && themes.map((theme: Theme, key: string) => (
                                <option key={key} value={key}>{key}</option>
                            )).toArray()
                        }
                    </select>
                </ThemeSelector>
            </div>
        );
    }

    private handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const {
            themes,
        } = this.props;
        const handler = this.props.setActiveTheme;
        const selectedTheme = themes && themes.find((value: Theme, key: string) => event.target.value === key);
        if (handler && selectedTheme) {
            handler(selectedTheme);
        }
    }

}

export default styled(Header)`
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.tertiaryText};
    grid-area: header;
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;

    .current-user {
        margin: auto;
    }

    .title {
        margin: auto 8px;
        font-size: 1.5em;
    }

    .file-chooser {
        margin: auto;
    }

`;
