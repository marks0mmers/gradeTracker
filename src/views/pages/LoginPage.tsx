import { push } from "connected-react-router";
import { Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { useActions, useSelector } from "src/state/hooks";
import { CombinedState } from "src/state/store";
import styled from "styled-components";
import * as Yup from "yup";
import { LoginUser, User } from "../../models/User";
import { CreateNewUserCreator, getCurrentUser, LoginCreator } from "../../state/ducks/data/users";
import { getPreviousRoute } from "../../state/ducks/router/selectors";
import { useComponentMount, useComponentUpdate } from "../../util/Hooks";
import Input from "../components/styled-inputs/Input";
import Button from "../controls/button/Button";

interface Props {
    className?: string;
}

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

interface State {
    creatingNewUser: boolean;
    formValues: LoginForm | NewUserForm;
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

const LoginValidation = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
});

const LoginPage = (componentProps: Props) => {

    const [state, setState] = useState<State>({
        creatingNewUser: false,
        formValues: {
            email: "",
            password: "",
        },
    });

    const {currentUser, prevRoute} = useSelector((rootState: CombinedState) => ({
        currentUser: getCurrentUser(rootState),
        prevRoute: getPreviousRoute(rootState),
    }));

    const {createNewUser, login, pushRoute} = useActions({
        createNewUser: CreateNewUserCreator,
        login: LoginCreator,
        pushRoute: push,
    });

    useComponentMount(() => {
        document.title = "Login to Grade Tracker";
    });

    useComponentUpdate(() => {
        if (currentUser) {
            pushRoute(prevRoute || "/");
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
                {buildButton(30, "Create User", "Switch to Create User", "reset", toggleCreate)}
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
                {buildButton(30, "Back to Login", "Switch to Login", "reset", toggleCreate)}
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
            formValues: !state.creatingNewUser
            ? {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                repeatPassword: "",
            }
            : {
                email: "",
                password: "",
            },
        });
    };

    const handleFormSubmit = (values: LoginForm | NewUserForm) => {
        if (state.creatingNewUser) {
            const newUser = new User({
                ...values,
            });
            createNewUser(newUser);
        } else {
            login(values as LoginUser);
        }
    };

    return (
        <div id="login-content" className={componentProps.className}>
            <LoginContainer id="login-container">
                <Header>
                    <HeaderText>{state.creatingNewUser ? "Create new User" : "Login to Grade Tracker"}</HeaderText>
                </Header>
                <Formik
                    initialValues={state.formValues}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleFormSubmit}
                    validationSchema={state.creatingNewUser ? NewUserValidation : LoginValidation}
                >
                    {state.creatingNewUser ? renderNewUserForm : renderLoginForm}
                </Formik>
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

export default styled(LoginPage)`
    grid-area: content;
    margin: 0 60px 60px 0;
    display: flex;
    justify-content: center;
`;
