import { Formik, FormikProps } from "formik";
import React, { MouseEvent, useCallback, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { adminViewUsersColumns } from "../../../constants/columns/AdminViewUsersColumns";
import { User, UserGridView } from "../../../models/User";
import { getCurrentUser, getUsers, GetUsersCreator } from "../../../state/ducks/data/users";
import { useMapDispatch, useMapState } from "../../../state/hooks";
import { RootState } from "../../../state/rootReducer";
import { useComponentMount } from "../../../util/Hooks";
import Divider from "../../components/shared/Divider";
import Input from "../../components/styled-inputs/Input";
import Button from "../../controls/button/Button";
import DataGrid from "../../controls/data-grid";
import { DataGridElement } from "../../controls/data-grid/models/DataGridElement";

interface Props {
    className?: string;
}

const NewUserValidation = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
});

const AdminViewUsersPage = (props: Props) => {

    const [selectedUser, setSelectedUser] = useState<User>();

    const {
        // currentUser,
        users,
    } = useMapState((state: RootState) => ({
        currentUser: getCurrentUser(state),
        users: getUsers(state),
    }));

    const {getUsersAction} = useMapDispatch({getUsersAction: GetUsersCreator});

    useComponentMount(() => {
        getUsersAction();
    });

    const handleSelectUser = useCallback((event: MouseEvent<HTMLDivElement>, payload: UserGridView) => {
        const newSelectedUser = users.find((user: User) => user._id === payload._id);
        setSelectedUser(newSelectedUser);
    }, [users]);

    const buildInputField = useCallback((
        label: string,
        value: string,
        formProps: FormikProps<User>,
        name: string,
        error?: string,
        type?: string,
    ) => {
        return (
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
        );
    }, []);

    const getUserGridData = useCallback(() => {
        return users.map((user: User) => new DataGridElement({
            payload: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            isSelected: selectedUser && user._id === selectedUser._id,
        })).toList();
    }, [users, selectedUser]);

    const handleEditUser = useCallback((editedUser: User) => {
        alert(editedUser);
    }, []);

    return (
        <div id="admin-view-users-page" className={props.className}>
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
        </div>
    );
};

const LabelInput = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Error = styled.div`
    color: red;
`;

export default styled(AdminViewUsersPage)`
    margin: 10px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`;
