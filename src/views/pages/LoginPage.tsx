import { push } from "connected-react-router";
import { Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";
import * as Yup from "yup";
import { LoginUser, User } from "../../models/User";
import { CreateNewUserCreator, getCurrentUser, LoginCreator } from "../../state/ducks/data/users";
import { RootState } from "../../state/rootReducer";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/Button";

interface PassedProps {
    className?: string;
}

interface PropsFromState {
    currentUser: User;
}

interface PropsFromDispatch {
    createNewUser: typeof CreateNewUserCreator;
    login: typeof LoginCreator;
    pushRoute: typeof push;
}

type Props = PassedProps & PropsFromState & PropsFromDispatch;

interface LoginForm {
    email: string;
    password: string;
}

interface NewUserForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
}

// tslint:disable-next-line:no-any
const isNewUserForm = (object: any): object is NewUserForm => {
    return "firstName" in object;
};

interface State {
    creatingNewUser: boolean;
}

const NewUserValidation = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null])
        .required("Password confirm is required"),
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
});

const NewUserValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    repeatPassword: "",
};

const LoginValues = {
    email: "",
    password: "",
};

const LoginValidation = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
});

const LoginPage = (componentProps: Props) => {

    const [state, setState] = useState<State>({
        creatingNewUser: false,
    });

    useEffect(() => {
        if (componentProps.currentUser) {
            componentProps.pushRoute("/");
        }
    });

    const renderLoginForm = (props: FormikProps<LoginForm>) => (
        <Form onSubmit={props.handleSubmit}>
            {buildInputField(
                "Email",
                props.values.email,
                props,
                "email",
                props.errors.email,
            )}
            {buildInputField(
                "Password",
                props.values.password,
                props,
                "password",
                props.errors.password,
                "password",
            )}
            <Buttons>
                {buildButton(30, "Create User", "Switch to Create User", undefined, toggleCreate)}
                {buildButton(30, "Login", "Click to Login", "submit")}
            </Buttons>
        </Form>
    );

    const renderNewUserForm = (props: FormikProps<NewUserForm>) => (
        <Form onSubmit={props.handleSubmit}>
            {buildInputField(
                "First Name",
                props.values.firstName,
                props,
                "firstName",
                props.errors.firstName,
            )}
            {buildInputField(
                "Last Name",
                props.values.lastName,
                props,
                "lastName",
                props.errors.lastName,
            )}
            {buildInputField(
                "Email",
                props.values.email,
                props,
                "email",
                props.errors.email,
            )}
            {buildInputField(
                "Password",
                props.values.password,
                props,
                "password",
                props.errors.password,
                "password",
            )}
            {buildInputField(
                "Repeat Password",
                props.values.repeatPassword,
                props,
                "repeatPassword",
                props.errors.repeatPassword,
                "password",
            )}
            <Buttons>
                {buildButton(30, "Back to Login", "Switch to Login", undefined, toggleCreate)}
                {buildButton(30, "Create User", "Click to Create New User", "submit")}
            </Buttons>
        </Form>
    );

    const buildInputField = <T extends {}>(
        label: string,
        value: string,
        props: FormikProps<T>,
        name: string,
        error?: string,
        type?: string,
    ) => {
        return (
            <LabelInput>
                {label}
                <Input
                    type={type || "text"}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={value}
                    name={name}
                />
                {error && <Error>{error}</Error>}
            </LabelInput>
        );
    };

    const buildButton = (
        height: number,
        text: string,
        tooltip: string,
        type?: "button" | "submit" | "reset",
        onClick?: () => void,
    ) => (
        <Button
            width={200}
            height={height}
            text={text}
            type={type}
            tooltip={tooltip}
            onClick={onClick}
        />
    );

    const toggleCreate = () => {
        setState({
            creatingNewUser: !state.creatingNewUser,
        });
    };

    const handleFormSubmit = (values: LoginForm | NewUserForm) => {
        if (isNewUserForm(values)) {
            const newUser = new User({
                ...values,
            });
            componentProps.createNewUser(newUser);
        } else {
            componentProps.login(values as LoginUser);
        }
    };

    return (
        <div id="login-content" className={componentProps.className}>
            <LoginContainer id="login-container">
                <Header>
                    <HeaderText>{state.creatingNewUser ? "Create new User" : "Login to Grade Tracker"}</HeaderText>
                </Header>
                <Formik
                    initialValues={state.creatingNewUser ? NewUserValues : LoginValues}
                    onSubmit={handleFormSubmit}
                    validationSchema={state.creatingNewUser ? NewUserValidation : LoginValidation}
                    render={state.creatingNewUser ? renderNewUserForm : renderLoginForm}
                />
            </LoginContainer>
        </div>
    );

};

const Form = styled.form`
    margin: 10px;
`;

const LabelInput = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const LoginContainer = styled.div`
    border: solid #4d6d9a 2px;
    border-radius: 7px;
    width: 500px;
    max-width: 500px;
    height: fit-content;
`;

const Header = styled.div`
    display: flex;
    background: #4d6d9a;
    border-radius: 4px 4px 0 0;
`;

const HeaderText = styled.h2`
    color: white;
    margin: 10px auto;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Error = styled.div`
    color: red;
`;

const mapStateToProps = (state: RootState) => ({
    currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => {
    return bindActionCreators({
        createNewUser: CreateNewUserCreator,
        login: LoginCreator,
        pushRoute: push,
    }, dispatch);
};

export default styled(connect(mapStateToProps, mapDispatchToProps)(LoginPage))`
    grid-area: content;
    margin: 0 60px 60px 0;
    display: flex;
    justify-content: center;
`;
