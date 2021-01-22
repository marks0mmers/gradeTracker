import { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { User } from "../../../models/User";
import { LogoutCreator } from "../../../state/ducks/data/users";
import { GetUsersCreator } from "../../../state/ducks/data/users/actions/GetUsers";
import { getUsers, getCurrentUser } from "../../../state/ducks/data/users/selectors";
import {
    ApproveViewRequestCreator,
    DenyViewRequestCreator,
    GetMyViewRequestsCreator,
} from "../../../state/ducks/data/viewRequests/actions";
import { getMyViewRequests } from "../../../state/ducks/data/viewRequests/selectors";
import { useMapDispatch, useMapState } from "../../../state/hooks";
import { RootState } from "../../../state/rootReducer";
import ApproveDenyRequest from "../viewRequest/ApproveDenyRequest";
import Button from "./Button";
import Divider from "./Divider";

interface Props {
    title?: string;
}

const Header = (props: Props) => {

    const [showPopup, setShowPopup] = useState(false);

    const appState = useMapState((state: RootState) => ({
        myViewRequests: getMyViewRequests(state),
        users: getUsers(state),
        currentUser: getCurrentUser(state),
    }));

    const actions =  useMapDispatch({
        fetchMyViewRequests: GetMyViewRequestsCreator,
        approveViewRequest: ApproveViewRequestCreator,
        denyViewRequest: DenyViewRequestCreator,
        fetchUsers: GetUsersCreator,
        logout: LogoutCreator,
    });

    useEffect(() => {
        actions.fetchUsers();
        actions.fetchMyViewRequests();
    }, [actions]);

    const togglePopup = useCallback(() => {
        setShowPopup(!showPopup);
    }, [showPopup]);

    const handleApprove = useCallback((requestId: string) => {
        actions.approveViewRequest(requestId);
    }, [actions]);

    const handleDeny = useCallback((requestId: string) => {
        actions.denyViewRequest(requestId);
    }, [actions]);

    const getAllRequests = useCallback(() => {
        const requests = appState.myViewRequests
            .map(request => (
                <ApproveDenyRequest
                    key={request.id}
                    requestId={request.id}
                    status={request.status}
                    userFromRequest={appState.users.find((u) => request.requester === u._id) || new User()}
                    onApprove={handleApprove}
                    onDeny={handleDeny}
                />
            )).toList();
        return requests.size > 0 ? requests : (<span>No View Requests</span>);
    }, [handleApprove, handleDeny, appState.myViewRequests, appState.users]);

    return (
        <Container id="header">
            {props.title && <Title>{props.title}</Title>}
            <div />
            <CurrentUser>
                {`${appState.currentUser?.firstName} ${appState.currentUser?.lastName}`}
            </CurrentUser>
            <Button
                icon="notifications"
                onClick={togglePopup}
                height={40}
                marginLeftRight={10}
                marginTopBottom={10}
                width={60}
            />
            {showPopup &&
                <Popover>
                    <div className="label">View Requests</div>
                    <Divider isVertical={false} top={5} bottom={5} />
                    {getAllRequests()}
                </Popover>
            }
            <Button
                text="Logout"
                onClick={actions.logout}
                height={40}
                marginLeftRight={10}
                marginTopBottom={10}
                width={100}
            />
        </Container>
    );
};

const Popover = styled.div`
    position: absolute;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    color: black;
    top: 60px;
    right: 120px;
    width: 300px;

    .label {
        margin: 10px;
    }
`;

const Container = styled.div`
    background-color: #4d6d9a;
    color: white;
    grid-area: header;
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
`;

const CurrentUser = styled.span`
    margin: auto;
`;

const Title = styled.span`
    margin: auto 8px;
    font-size: 1.5em;
`;

export default Header;
