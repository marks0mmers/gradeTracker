import React from "react";
import styled from "styled-components";
import { User } from "../../../models/User";
import { LogoutCreator } from "../../../state/ducks/data/users";
import Button from "../../controls/button/Button";

interface Props {
    className?: string;
    icon?: string;
    title?: string;
    currentUser?: User;

    logout: typeof LogoutCreator;
}

const Header = (props: Props) => (
    <div id="header" className={props.className}>
        {props.title && <span className="title">{props.title}</span>}
        <div />
        <span className="current-user">
            {`${props.currentUser && props.currentUser.firstName} ${props.currentUser && props.currentUser.lastName}`}
        </span>
        <Button
            text="Logout"
            onClick={props.logout}
            height={40}
            marginLeftRight={10}
            marginTopBottom={10}
            width={100}
        />
    </div>
);

export default styled(Header)`
    background-color: #4d6d9a;
    color: white;
    grid-area: header;
    display: grid;
    grid-template-columns: auto 1fr auto auto;

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
