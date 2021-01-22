import { useCallback } from "react";
import styled from "styled-components";
import { User } from "../../../models/User";

interface Props {
    requestId: string;
    status: number;
    userFromRequest: User;
    onApprove: (requestId: string) => void;
    onDeny: (requestId: string) => void;
}

const ApproveDenyRequest = ({onApprove, onDeny, ...props}: Props) => {

    const handleApprove = useCallback(() => {
        onApprove(props.requestId);
    }, [onApprove, props.requestId]);

    const handleDeny = useCallback(() => {
        onDeny(props.requestId);
    }, [onDeny, props.requestId]);

    return (
        <Container status={props.status}>
            <Label>{`Request from ${props.userFromRequest.firstName} ${props.userFromRequest.lastName}`}</Label>
            <Icon
                className="material-icons"
                color="darkgreen"
                onClick={handleApprove}
            >
                done
            </Icon>
            <Icon
                className="material-icons"
                color="red"
                onClick={handleDeny}
            >
                clear
            </Icon>
        </Container>
    );
};

const Container = styled.div<{status: number}>`
    display: flex;
    padding: 10px;
    background-color: ${props => {
        switch (props.status) {
            case 2: return "#59f75c";
            case 3: return "#f75959";
            default: return "white";
        }
    }};
`;

const Label = styled.span`
    font-size: 12px;
    flex: 1;
    opacity: 1;
`;

const Icon = styled.i<{color: string}>`
    font-size: 12px;
    color: ${props => props.color};
    margin-left: 5px;
    opacity: 1;

    :hover {
        background: lightgray;
    }
`;

export default ApproveDenyRequest;
