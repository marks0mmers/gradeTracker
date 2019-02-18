import { Map } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { LoginUser, User } from "../../models/User";
import { CreateNewUserCreator, LoginCreator } from "../../state/ducks/data/users";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/package/Button";

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

class LoginContent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.toggleCreate = this.toggleCreate.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.state = {
            formValues: Map(),
            formErrors: Map(),
            creatingNewUser: false,
        };
    }

    public render() {
        const {
            className,
        } = this.props;

        const {
            formValues,
            creatingNewUser,
            formErrors,
        } = this.state;

        return (
            <div className={className}>
                {
                    !creatingNewUser &&
                    <>
                    <span className="header">Welcome to Grade Tracker</span>
                    <Input
                        name="email"
                        placeholder="Email"
                        isInvalid={formErrors.get("email")}
                        height={25}
                        width={200}
                        gridArea="email"
                        value={formValues.get("email")}
                        onChange={this.onInputChange}
                    />
                    <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                        isInvalid={formErrors.get("password")}
                        height={25}
                        width={200}
                        gridArea="password"
                        value={formValues.get("password")}
                        onChange={this.onInputChange}
                    />
                    <Button
                        width={200}
                        height={30}
                        text="Login"
                        gridArea="login"
                        tooltip="Click to login"
                        onClick={this.validateForm}
                    />
                    <Button
                        width={200}
                        height={20}
                        text="Create New User"
                        gridArea="create"
                        tooltip="Switch to create a new user"
                        onClick={this.toggleCreate}
                    />
                    </>
                }
                {
                    creatingNewUser &&
                    <>
                    <div className="first-last">
                        <Input
                            name="firstName"
                            placeholder="First Name"
                            isInvalid={formErrors.get("firstName")}
                            height={25}
                            width={95}
                            marginRight={5}
                            value={formValues.get("firstName")}
                            onChange={this.onInputChange}
                        />
                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            isInvalid={formErrors.get("lastName")}
                            height={25}
                            width={95}
                            marginLeft={5}
                            value={formValues.get("lastName")}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <Input
                        name="email"
                        placeholder="Email"
                        isInvalid={formErrors.get("email")}
                        height={25}
                        width={200}
                        gridArea="email"
                        value={formValues.get("email")}
                        onChange={this.onInputChange}
                    />
                    <div className="password-dup">
                        <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            isInvalid={formErrors.get("password")}
                            height={25}
                            width={200}
                            value={formValues.get("password")}
                            onChange={this.onInputChange}
                        />
                        <Input
                            name="passwordRepeat"
                            placeholder="Repeat Password"
                            type="password"
                            isInvalid={formErrors.get("passwordRepeat")}
                            height={25}
                            width={200}
                            value={formValues.get("passwordRepeat")}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <Button
                        width={200}
                        height={30}
                        text="Create User"
                        gridArea="login"
                        tooltip="Click to create a new user"
                        onClick={this.validateForm}
                    />
                    <Button
                        width={200}
                        height={20}
                        text="Back to Login"
                        gridArea="create"
                        tooltip="Switch to login"
                        onClick={this.toggleCreate}
                    />
                    </>
                }
            </div>
        );
    }

    private onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState({
            formValues: this.state.formValues.set(name, value),
        });
    }

    private handleLogin() {
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

    private toggleCreate() {
        this.setState({
            creatingNewUser: !this.state.creatingNewUser,
            formValues: Map(),
            formErrors: Map(),
        });
    }

    private handleNewUser() {
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
            this.setState({
                formValues: Map(),
            });
        }
    }

    private validateForm() {
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
