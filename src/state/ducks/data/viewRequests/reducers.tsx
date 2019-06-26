import { Map, Record, RecordOf } from "immutable";
import { ViewRequest } from "../../../../models/ViewRequest";
import { ViewRequestDataActions } from "./actions";
import { ViewRequestDataActionTypes as types} from "./types";

interface IViewRequestDataState {
    myViewRequests: Map<string, ViewRequest>;
    pendingViewRequests: Map<string, ViewRequest>;
}

export const ViewRequestDataState = Record<IViewRequestDataState>({
    myViewRequests: Map(),
    pendingViewRequests: Map(),
});

export type ViewRequestDataState = RecordOf<IViewRequestDataState>;

export const ViewRequestDataReducer = (
    state = new ViewRequestDataState(),
    action: ViewRequestDataActions,
) => {
    switch (action.type) {
        case (types.GET_MY_VIEW_REQUESTS_SUCCESS):
            return state.set("myViewRequests", action.requests.reduce(
                (requests, request) => requests.set(request.id, request),
                Map<string, ViewRequest>(),
            ));
        case (types.GET_PENDING_VIEW_REQUESTS_SUCCESS):
            return state.set("pendingViewRequests", action.requests.reduce(
                (requests, request) => requests.set(request.id, request),
                Map<string, ViewRequest>(),
            ));
        case (types.SEND_VIEW_REQUEST_SUCCESS):
            return state.setIn(["pendingViewRequests", action.request.id], action.request);
        case (types.APPROVE_VIEW_REQUEST_SUCCESS):
            return state.setIn(["myViewRequests", action.request.id], action.request);
        case (types.DENY_VIEW_REQUEST_SUCCESS):
            return state.setIn(["myViewRequests", action.request.id], action.request);
        default:
            return state;
    }
};
