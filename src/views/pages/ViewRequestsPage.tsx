import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { User } from "../../models/User";
import { ViewRequestStatus, ViewRequest } from "../../models/ViewRequest";
import { GetUsersCreator } from "../../state/ducks/data/users/actions/GetUsers";
import { getCurrentUser, getUsers } from "../../state/ducks/data/users/selectors";
import { GetSentViewRequestsCreator, SendViewRequestCreator } from "../../state/ducks/data/viewRequests/actions";
import { getSentViewRequests } from "../../state/ducks/data/viewRequests/selectors";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { RootState } from "../../state/rootReducer";
import Button from "../components/shared/Button";
import Divider from "../components/shared/Divider";
import { ListControlElement } from "../controls/list-control/models/ListControlElement";
import ListControl from "../controls/list-control/package/ListControl";
import { getIsLoading } from "../../state/ducks/control/loadingmask/selectors";
import ActivityLoading from "../components/shared/LoadingMask";
import { useHistory } from "react-router";

const ViewRequestsPage = () => {
    const { push } = useHistory();

    const [selectedUser, setSelectedUser] = useState<User>();
    const [selectedViewRequest, setSelectedViewRequest] = useState<ViewRequest>();

    const appState = useMapState((state: RootState) => ({
        isLoading: getIsLoading(state),
        currentUser: getCurrentUser(state),
        users: getUsers(state),
        pendingViewRequests: getSentViewRequests(state),
    }));

    const dispatch = useMapDispatch({
        fetchUsers: GetUsersCreator,
        fetchSentViewRequests: GetSentViewRequestsCreator,
        sendViewRequest: SendViewRequestCreator,
    });

    useEffect(() => {
        dispatch.fetchUsers();
        dispatch.fetchSentViewRequests();
    }, [dispatch]);

    const handleRowClick = useCallback((primary: string, secondary?: string) => {
        const selected = appState.users.find((user) => user.email === secondary);
        if (selected) {
            setSelectedUser(selected);
        }
    }, [appState.users]);

    const handleViewRequestClick = useCallback((primary: string) => {
        const receiverName = primary.split(": ")[1];
        const receiver = appState.users.find((user) => `${user.firstName} ${user.lastName}` === receiverName);
        const request = appState.pendingViewRequests.find((req) =>
            (appState.currentUser &&
            req.requester === appState.currentUser._id &&
            receiver &&
            req.receiver === receiver._id) || false,
        );
        if (request && request.status === 2) {
            setSelectedViewRequest(request);
        } else {
            setSelectedViewRequest(undefined);
        }
    }, [appState.currentUser, appState.pendingViewRequests, appState.users]);

    const getSendViewRequestsListData = useCallback(() => appState.users
        .filter((user) => appState.currentUser && user._id !== appState.currentUser._id)
        .filter((user) => !appState.pendingViewRequests.some((req) => req.receiver === user._id))
        .map((user): ListControlElement => ({
            primaryProperty: `${user.firstName} ${user.lastName}`,
            secondaryProperty: user.email,
            isSelected: user === selectedUser,
        }))
        .toList(), 
    [selectedUser, appState.currentUser, appState.pendingViewRequests, appState.users]);

    const getSentRequestsListData = useCallback(() => appState.pendingViewRequests.map((request): ListControlElement => {
        const receiver = appState.users.find((user) => user._id === request.receiver);
        return {
            primaryProperty: `Sent to: ${receiver && receiver.firstName} ${receiver && receiver.lastName}`,
            secondaryProperty: `Status: ${ViewRequestStatus[request.status]}`,
            isSelected: selectedViewRequest && selectedViewRequest.id === request.id,
        };
    }).toList(), [selectedViewRequest, appState.pendingViewRequests, appState.users]);

    const onSendClick = useCallback(() => {
        if (selectedUser) {
            dispatch.sendViewRequest(selectedUser._id);
        }
    }, [dispatch, selectedUser]);

    const onViewUserClick = useCallback(() => {
        if (selectedViewRequest) {
            push(`/analysis/${selectedViewRequest.receiver}`);
        }
    }, [push, selectedViewRequest]);

    return (
        <>
        { appState.isLoading && <ActivityLoading />}
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
                        onClick={onViewUserClick}
                    />
                )}
            />
        </Container>
        </>
    );
};

const Container = styled.div`
    margin: 10px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`;

export default ViewRequestsPage;
