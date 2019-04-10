import { Record } from "immutable";

const SessionStateRecord = Record({
});

export class SessionState extends SessionStateRecord {
}

export const SessionReducer = (
    state = new SessionState(),
) => {
    return state;
};
