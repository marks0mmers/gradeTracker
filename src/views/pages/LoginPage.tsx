import { push } from "connected-react-router";
import { Formik, FormikProps } from "formik";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import ActivityLoading from "../components/shared/LoadingMask";
import Required from "../components/shared/Required";
import { LoginUser, User } from "../../models/User";
import { CreateNewUserCreator, getCurrentUser, LoginCreator } from "../../state/ducks/data/users";
import { getPreviousRoute } from "../../state/ducks/router/selectors";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { useComponentMount, useComponentUpdate } from "../../util/Hooks";
import Button from "../components/shared/Button";
import Input from "../components/styled-inputs/Input";
import { getIsLoading } from "../../state/ducks/control/loadingmask/selectors";

//#region Form / Validation
interface UserForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const NewUserValidation = Yup.object().shape({
    email: Yup
        .string()
        .email("Must be in valid email format")
        .required("Email is Required"),
    password: Yup
        .string()
        .required("Password is Required"),
    repeatPassword: Yup
        .string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirm is required"),
    firstName: Yup
        .string()
        .required("First Name is Required"),
    lastName: Yup
        .string()
        .required("Last Name is Required"),
});

const LoginValidation = Yup.object().shape({
    email: Yup
        .string()
        .email("Must be in valid email format")
        .required("Email is Required"),
    password: Yup
        .string()
        .required("Password is Required"),
});
//#endregion

const LoginPage = () => {

    //#region Component State
    const [creatingNewUser, setCreatingNewUser] = useState(false);
    const [formValues, setFormValues] = useState<UserForm>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        repeatPassword: "",
    });
    //#endregion

    //#region Redux State
    const state = useMapState((state) => ({
        isLoading: getIsLoading(state),
        currentUser: getCurrentUser(state),
        prevRoute: getPreviousRoute(state),
    }));

    const actions = useMapDispatch({
        createNewUser: CreateNewUserCreator,
        login: LoginCreator,
        pushRoute: push,
    });
    //#endregion

    //#region Lifecycle Methods
    useComponentMount(() => {
        document.title = "Login to Grade Tracker";
    });

    useComponentUpdate(() => {
        if (state.currentUser) {
            actions.pushRoute(state.prevRoute || "/");
        }
    });
    //#endregion

    //#region Private Methods
    const toggleCreate = useCallback(() => {
        setCreatingNewUser(!creatingNewUser);
        setFormValues({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
        });
    }, [creatingNewUser]);

    const handleFormSubmit = useCallback((values: UserForm) => {
        if (creatingNewUser) {
            const newUser = new User({
                ...values,
            });
            actions.createNewUser(newUser);
        } else {
            actions.login(values as LoginUser);
        }
    }, [actions, creatingNewUser]);
    //#endregion

    //#region Display Methods
    const buildInputField = useCallback((
        label: string,
        value: string,
        props: FormikProps<UserForm>,
        name: string,
        required,
        error?: string,
        type?: string,
        autoComplete?: string,
    ) => (
        <LabelInput>
            {label}
            {required && <Required />}
            <Input
                type={type || "text"}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={value}
                autoComplete={autoComplete}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </LabelInput>
    ), []);

    const buildButton = useCallback((
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
    ), []);

    const renderLoginForm = useCallback((props: FormikProps<UserForm>) => (
        <Form onSubmit={props.handleSubmit}>
            {buildInputField(
                "Email",
                props.values.email,
                props,
                "email",
                true,
                props.errors.email,
                undefined,
                "username",
            )}
            {buildInputField(
                "Password",
                props.values.password,
                props,
                "password",
                true,
                props.errors.password,
                "password",
                "current-password",
            )}
            <Buttons>
                {buildButton(30, "Create User", "Switch to Create User", "reset", toggleCreate)}
                {buildButton(30, "Login", "Click to Login", "submit")}
            </Buttons>
        </Form>
    ), [buildButton, buildInputField, toggleCreate]);

    const renderNewUserForm = useCallback((props: FormikProps<UserForm>) => (
        <Form onSubmit={props.handleSubmit}>
            {buildInputField(
                "First Name",
                props.values.firstName,
                props,
                "firstName",
                true,
                props.errors.firstName,
            )}
            {buildInputField(
                "Last Name",
                props.values.lastName,
                props,
                "lastName",
                true,
                props.errors.lastName,
            )}
            {buildInputField(
                "Email",
                props.values.email,
                props,
                "email",
                true,
                props.errors.email,
            )}
            {buildInputField(
                "Password",
                props.values.password,
                props,
                "password",
                true,
                props.errors.password,
                "password",
            )}
            {buildInputField(
                "Repeat Password",
                props.values.repeatPassword,
                props,
                "repeatPassword",
                true,
                props.errors.repeatPassword,
                "password",
            )}
            <Buttons>
                {buildButton(30, "Back to Login", "Switch to Login", "reset", toggleCreate)}
                {buildButton(30, "Create User", "Click to Create New User", "submit")}
            </Buttons>
        </Form>
    ), [buildButton, buildInputField, toggleCreate]);
    //#endregion

    //#region Render Method
    return (
        <>
        { state.isLoading && <ActivityLoading /> }
        <Container id="login-page">
            <LoginContainer id="login-container">
                <Header>
                    <HeaderText>{creatingNewUser ? "Create new User" : "Login to Grade Tracker"}</HeaderText>
                </Header>
                <Formik
                    initialValues={formValues}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleFormSubmit}
                    validationSchema={creatingNewUser ? NewUserValidation : LoginValidation}
                >
                    {creatingNewUser ? renderNewUserForm : renderLoginForm}
                </Formik>
            </LoginContainer>
        </Container>
        </>
    );
    //#endregion
};

//#region Styles
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

const Container = styled.div`
    grid-area: content;
    margin: 0 60px 60px 0;
    display: flex;
    justify-content: center;
`;
//#endregion

export default LoginPage;
