import { Formik, FormikProps } from "formik";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { adminViewUsersColumns } from "../../../constants/columns/AdminViewUsersColumns";
import { User, UserGridView } from "../../../models/User";
import { getCurrentUser, getUsers, GetUsersCreator } from "../../../state/ducks/data/users";
import { useMapDispatch, useMapState } from "../../../state/hooks";
import { RootState } from "../../../state/rootReducer";
import Button from "../../components/shared/Button";
import Divider from "../../components/shared/Divider";
import Input from "../../components/styled-inputs/Input";
import DataGrid from "../../controls/data-grid";
import { DataGridElement } from "../../controls/data-grid/models/DataGridElement";
import { getIsLoading } from "../../../state/ducks/control/loadingmask/selectors";
import ActivityLoading from "../../components/shared/LoadingMask";

const NewUserValidation = Yup.object().shape({
    email: Yup
        .string()
        .email("Must be in valid email format")
        .required("Email is Required"),
    firstName: Yup
        .string()
        .required("First Name is Required"),
    lastName: Yup
        .string()
        .required("Last Name is Required"),
});

const AdminViewUsersPage = () => {

    const [selectedUser, setSelectedUser] = useState<User>();

    const appState = useMapState((state: RootState) => ({
        currentUser: getCurrentUser(state),
        users: getUsers(state),
        isLoading: getIsLoading(state),
    }));

    const dispatch = useMapDispatch({getUsersAction: GetUsersCreator});

    useEffect(() => {
        dispatch.getUsersAction();
    }, [dispatch]);

    const handleSelectUser = useCallback((event: MouseEvent<HTMLDivElement>, payload: UserGridView) => {
        const newSelectedUser = appState.users.find((user) => user._id === payload._id);
        setSelectedUser(newSelectedUser);
    }, [appState.users]);

    const getUserGridData = useCallback(() => appState.users.map((user) => new DataGridElement<User>(
        new User({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }),
        selectedUser && user._id === selectedUser._id,
    )).toList(), [selectedUser, appState.users]);

    const handleEditUser = useCallback((editedUser: User) => {
        alert(editedUser);
    }, []);

    const buildInputField = useCallback((
        label: string,
        value: string,
        formProps: FormikProps<User>,
        name: string,
        error?: string,
        type?: string,
    ) => (
        <LabelInput>
            {label}
            <Input
                type={type || "text"}
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                value={value}
                name={name}
            />
            {error && <Error>{error}</Error>}
        </LabelInput>
    ), []);

    return (
        <>
        { appState.isLoading && <ActivityLoading /> }
        <Container id="admin-view-users-page">
            <DataGrid
                id="users-data-grid"
                elements={getUserGridData()}
                columnDefinitions={adminViewUsersColumns}
                onBodyCellClick={handleSelectUser}
            />
            <Divider isVertical={true} left={10} right={10} />
            {!selectedUser && <div>Select a User to Edit</div>}
            {selectedUser &&
                <Formik
                    initialValues={selectedUser}
                    enableReinitialize={true}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleEditUser}
                    validationSchema={NewUserValidation}
                >
                    {(formProps: FormikProps<User>) => (
                        <form onSubmit={formProps.handleSubmit}>
                            {buildInputField(
                                "First Name",
                                formProps.values.firstName,
                                formProps,
                                "firstName",
                                formProps.errors.firstName,
                            )}
                            {buildInputField(
                                "Last Name",
                                formProps.values.lastName,
                                formProps,
                                "lastName",
                                formProps.errors.lastName,
                            )}
                            {buildInputField(
                                "Email",
                                formProps.values.email,
                                formProps,
                                "email",
                                formProps.errors.email,
                            )}
                            <Button
                                type="submit"
                                text="Submit"
                                height={40}
                            />
                        </form>
                    )}
                </Formik>
            }
        </Container>
        </>
    );
};

const LabelInput = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Error = styled.div`
    color: red;
`;

const Container = styled.div`
    margin: 10px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`;

export default AdminViewUsersPage;
