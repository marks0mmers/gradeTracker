import { Map } from "immutable";
import React, { ChangeEvent, Component, Fragment } from "react";
import styled from "styled-components";
import { LoginUser, User } from "../../models/User";
import { CreateNewUserCreator, LoginCreator } from "../../state/ducks/data/users";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/Button";

interface Props {
    className?: string;
    currentUser?: User;

    createNewUser?: typeof CreateNewUserCreator;
    login?: typeof LoginCreator;
}

interface State {
    formValues: Map<string, string>;
    formErrors: Map<string, boolean>;
    creatingNewUser: boolean;
}

class LoginContent extends Component<Props, State> {

    public state = {
        formValues: Map<string, string>(),
        formErrors: Map<string, boolean>(),
        creatingNewUser: false,
    };

    public render() {
        const {
            className,
        } = this.props;

        const {
            creatingNewUser,
        } = this.state;

        return (
            <div className={className}>
                {
                    !creatingNewUser &&
                    <Fragment>
                        <span className="header">Welcome to Grade Tracker</span>
                        {this.buildInputField("email", "Email", 200, "email")}
                        {this.buildInputField("password", "Password", 200, "password", "password")}
                        {this.buildButton(30, "Login", "login", "Click to login", this.validateForm)}
                        {this.buildButton(20, "Create New User", "create", "Create a new user", this.toggleCreate)}
                    </Fragment>
                }
                {
                    creatingNewUser &&
                    <Fragment>
                        <div className="first-last">
                            {this.buildInputField("firstName", "First Name", 95)}
                            {this.buildInputField("lastName", "Last Name", 95)}
                        </div>
                        {this.buildInputField("email", "Email", 200, "email")}
                        <div className="password-dup">
                            {this.buildInputField("password", "Password", 200, undefined, "password")}
                            {this.buildInputField("passwordRepeat", "Repeat Password", 200, undefined, "password")}
                        </div>
                        {this.buildButton(30, "Create User", "login", "Click to create a new user", this.validateForm)}
                        {this.buildButton(20, "Back to Login", "create", "Switch to Login", this.toggleCreate)}
                    </Fragment>
                }
            </div>
        );
    }

    private buildInputField = (
        name: string,
        placeholder: string,
        width: number,
        gridArea?: string,
        type?: string,
    ) => {
        const { formValues, formErrors } = this.state;
        return (
            <Input
                name={name}
                placeholder={placeholder}
                type={type}
                isInvalid={formErrors.get(name)}
                gridArea={gridArea}
                height={25}
                width={width}
                value={formValues.get(name)}
                onChange={this.onInputChange}
            />
        );
    }

    private buildButton = (
        height: number,
        text: string,
        gridArea: string,
        tooltip: string,
        onClick: () => void,
    ) => (
        <Button
            width={200}
            height={height}
            text={text}
            gridArea={gridArea}
            tooltip={tooltip}
            onClick={onClick}
        />
    )

    private onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({
            formValues: this.state.formValues.set(name, value),
        });
    }

    private handleLogin = () => {
        const { formValues } = this.state;
        const handler = this.props.login;
        const loginUser: LoginUser = {
            email: formValues.get("email"),
            password: formValues.get("password"),
        };
        if (handler) {
            handler(loginUser);
        }
    }

    private toggleCreate = () => {
        this.setState({
            creatingNewUser: !this.state.creatingNewUser,
            formValues: Map(),
            formErrors: Map(),
        });
    }

    private handleNewUser = () => {
        const { formValues } = this.state;
        const handler = this.props.createNewUser;
        const user = new User({
            firstName: formValues.get("firstName"),
            lastName: formValues.get("lastName"),
            email: formValues.get("email"),
            password: formValues.get("password"),
            isAdmin: false,
        });
        if (handler) {
            handler(user);
        }
        this.setState({
            formValues: Map(),
        });
    }

    private validateForm = () => {
        const { formValues, creatingNewUser } = this.state;
        let formErrors = Map<string, boolean>();
        if (creatingNewUser) {
            formErrors = formErrors.set("firstName", !formValues.get("firstName"));
            formErrors = formErrors.set("lastName", !formValues.get("lastName"));
            formErrors = formErrors.set("email", !formValues.get("email"));
            formErrors = formErrors.set("password", !formValues.get("password"));
            formErrors = formErrors.set("passwordRepeat",
                !formValues.get("passwordRepeat") || formValues.get("password") !== formValues.get("passwordRepeat"));
        } else {
            formErrors = formErrors.set("email", !formValues.get("email"));
            formErrors = formErrors.set("password", !formErrors.get("password"));
        }
        this.setState({
            formErrors,
        }, formErrors.size > 0 ? creatingNewUser ? this.handleNewUser : this.handleLogin : undefined);
    }
}

export default styled(LoginContent)`
    grid-area: content;
    margin: 0 60px 60px 0;
    display: grid;
    background: ${(props) => props.theme.white};
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 1fr auto auto auto auto auto 1fr;
    grid-template-areas: ". . ."
                         ". header ."
                         ". email ."
                         ". password ."
                         ". login ."
                         ". create ."
                         ". . .";
    grid-row-gap: 10px;

    .header {
        color: ${(props) => props.theme.primaryText};
        grid-area: header;
    }

    .first-last {
        display: flex;
        grid-area: header;
    }

    .password-dup {
        grid-area: password;
        display: grid;
        grid-template-rows: auto auto;
        grid-row-gap: 10px;
    }
`;
