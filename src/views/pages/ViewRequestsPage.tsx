import { List } from "immutable";
import React, { useState } from "react";
import styled from "styled-components";
import { User } from "../../models/User";
import { ViewRequestStatus } from "../../models/ViewRequest";
import { ViewRequest } from "../../models/ViewRequest";
import { GetUsersCreator } from "../../state/ducks/data/users/actions/GetUsers";
import { getCurrentUser, getUsers } from "../../state/ducks/data/users/selectors";
import { GetSentViewRequestsCreator, SendViewRequestCreator } from "../../state/ducks/data/viewRequests/actions";
import { getSentViewRequests } from "../../state/ducks/data/viewRequests/selectors";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import { useComponentMount } from "../../util/Hooks";
import Divider from "../components/shared/Divider";
import Button from "../controls/button/Button";
import { ListControlElement } from "../controls/list-control/models/ListControlElement";
import ListControl from "../controls/list-control/package/ListControl";

const ViewRequestsPage = () => {

    const [selectedUser, setSelectedUser] = useState<User>();
    const [selectedViewRequest, setSelectedViewRequest] = useState<ViewRequest>();

    const { users, currentUser, pendingViewRequests } = useMapState((state: RootState) => ({
        currentUser: getCurrentUser(state),
        users: getUsers(state),
        pendingViewRequests: getSentViewRequests(state),
    }));

    const { fetchUsers, fetchSentViewRequests, sendViewRequest } = useMapDispatch({
        fetchUsers: GetUsersCreator,
        fetchSentViewRequests: GetSentViewRequestsCreator,
        sendViewRequest: SendViewRequestCreator,
    });

    useComponentMount(() => {
        fetchUsers();
        fetchSentViewRequests();
    });

    const handleRowClick = (primary: string, secondary?: string) => {
        const selected = users.find((user) => user.email === secondary);
        if (selected) {
            setSelectedUser(selected);
        }
    };

    const handleViewRequestClick = (primary: string, secondary?: string) => {
        const receiverName = primary.split(": ")[1];
        const receiver = users.find((user) => `${user.firstName} ${user.lastName}` === receiverName);
        const request = pendingViewRequests.find((req) =>
            (currentUser &&
            req.requester === currentUser._id &&
            receiver &&
            req.receiver === receiver._id) || false,
        );
        if (request && request.status === 2) {
            setSelectedViewRequest(request);
        } else {
            setSelectedViewRequest(undefined);
        }
    };

    const getSendViewRequestsListData = (): List<ListControlElement> => {
        return users
            .filter((user) => currentUser && user._id !== currentUser._id)
            .filter((user) => !pendingViewRequests.some((req) => req.receiver === user._id))
            .map((user) => ({
                primaryProperty: `${user.firstName} ${user.lastName}`,
                secondaryProperty: user.email,
                isSelected: user === selectedUser,
            }))
            .toList();
    };

    const getSentRequestsListData = (): List<ListControlElement> => {
        return pendingViewRequests
            .map((request) => {
                const receiver = users.find((user) => user._id === request.receiver);
                return {
                    primaryProperty: `Sent to: ${receiver && receiver.firstName} ${receiver && receiver.lastName}`,
                    secondaryProperty: `Status: ${ViewRequestStatus[request.status]}`,
                    isSelected: selectedViewRequest && selectedViewRequest.id === request.id,
                };
            })
            .toList();
    };

    const onSendClick = () => {
        if (selectedUser) {
            sendViewRequest(selectedUser._id);
        }
    };

    return (
        <Container>
            <ListControl
                header={true}
                headerText="Send View Requests"
                elements={getSendViewRequestsListData()}
                footer={true}
                footerContent={(
                    <Button
                        id="send-vr-button"
                        icon="send"
                        tooltip="Send View Request"
                        height={40}
                        width={60}
                        onClick={onSendClick}
                    />
                )}
                onRowClick={handleRowClick}
            />
            <Divider isVertical={true} left={10} right={10} />
            <ListControl
                header={true}
                headerText="Current View Request Statuses"
                elements={getSentRequestsListData()}
                onRowClick={handleViewRequestClick}
                footer={!!selectedViewRequest}
                footerContent={(
                    <Button
                        id="view-courses"
                        icon="equalizer"
                        tooltip="View Courses for User"
                        height={40}
                        width={60}
                    />
                )}
            />
        </Container>
    );

};

const Container = styled.div`
    margin: 10px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`;

export default ViewRequestsPage;
