import { combineEpics } from "redux-observable";
import { generateHeaders } from "../../../../util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../common/EpicBuilder";
import {
    ApproveViewRequest,
    ApproveViewRequestSuccessCreator,
    DenyViewRequest,
    DenyViewRequestSuccessCreator,
    GetMyViewRequestsSuccessCreator,
    GetSentViewRequestsSuccessCreator,
    SendViewRequest,
    SendViewRequestSuccessCreator,
    ViewRequestFailActionCreator,
} from "./actions";
import { ViewRequestDataActionTypes as types } from "./types";

const GetMyViewRequestsEpic = epicBuilder(
    GetMyViewRequestsSuccessCreator,
    ViewRequestFailActionCreator,
    types.GET_MY_VIEW_REQUESTS,
    AjaxMethodType.GET,
    () => "/api/viewRequests/forMeToRespond",
    generateHeaders(),
);

const GetSentViewRequestsEpic = epicBuilder(
    GetSentViewRequestsSuccessCreator,
    ViewRequestFailActionCreator,
    types.GET_PENDING_VIEW_REQUESTS,
    AjaxMethodType.GET,
    () => "/api/viewRequests/sent",
    generateHeaders(),
);

const SendViewRequestEpic = epicBuilder(
    SendViewRequestSuccessCreator,
    ViewRequestFailActionCreator,
    types.SEND_VIEW_REQUEST,
    AjaxMethodType.POST,
    (action: SendViewRequest) => `/api/viewRequests/send/user/${action.userToSend}`,
    generateHeaders(),
);

const ApproveViewRequestEpic = epicBuilder(
    ApproveViewRequestSuccessCreator,
    ViewRequestFailActionCreator,
    types.APPROVE_VIEW_REQUEST,
    AjaxMethodType.POST,
    (action: ApproveViewRequest) => `/api/viewRequests/approve/${action.requestId}`,
    generateHeaders(),
);

const DenyViewRequestEpic = epicBuilder(
    DenyViewRequestSuccessCreator,
    ViewRequestFailActionCreator,
    types.DENY_VIEW_REQUEST,
    AjaxMethodType.POST,
    (action: DenyViewRequest) => `/api/viewRequests/deny/${action.requestId}`,
    generateHeaders(),
);

export const ViewRequestEpics = combineEpics(
    GetMyViewRequestsEpic,
    GetSentViewRequestsEpic,
    SendViewRequestEpic,
    ApproveViewRequestEpic,
    DenyViewRequestEpic,
);
