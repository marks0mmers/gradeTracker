import { ViewRequest } from "../../../../models/ViewRequest";
import { ViewRequestDataActionTypes as types } from "./types";

export interface GetMyViewRequests {
    type: types.GET_MY_VIEW_REQUESTS;
}

export const GetMyViewRequestsCreator = (): GetMyViewRequests => ({
    type: types.GET_MY_VIEW_REQUESTS,
});

export interface GetMyViewRequestsSuccess {
    requests: ViewRequest[];
    type: types.GET_MY_VIEW_REQUESTS_SUCCESS;
}

export const GetMyViewRequestsSuccessCreator = (requests: ViewRequest[]): GetMyViewRequestsSuccess => ({
    requests,
    type: types.GET_MY_VIEW_REQUESTS_SUCCESS,
});

export interface GetSentViewRequests {
    type: types.GET_PENDING_VIEW_REQUESTS;
}

export const GetSentViewRequestsCreator = (): GetSentViewRequests => ({
    type: types.GET_PENDING_VIEW_REQUESTS,
});

export interface GetSentViewRequestsSuccess {
    requests: ViewRequest[];
    type: types.GET_PENDING_VIEW_REQUESTS_SUCCESS;
}

export const GetSentViewRequestsSuccessCreator = (requests: ViewRequest[]): GetSentViewRequestsSuccess => ({
    requests,
    type: types.GET_PENDING_VIEW_REQUESTS_SUCCESS,
});

export interface SendViewRequest {
    userToSend: string;
    type: types.SEND_VIEW_REQUEST;
}

export const SendViewRequestCreator = (userToSend: string): SendViewRequest => ({
    userToSend,
    type: types.SEND_VIEW_REQUEST,
});

export interface SendViewRequestSuccess {
    request: ViewRequest;
    type: types.SEND_VIEW_REQUEST_SUCCESS;
}

export const SendViewRequestSuccessCreator = (request: ViewRequest): SendViewRequestSuccess => ({
    request,
    type: types.SEND_VIEW_REQUEST_SUCCESS,
});

export interface ApproveViewRequest {
    requestId: string;
    type: types.APPROVE_VIEW_REQUEST;
}

export const ApproveViewRequestCreator = (requestId: string): ApproveViewRequest => ({
    requestId,
    type: types.APPROVE_VIEW_REQUEST,
});

export interface ApproveViewRequestSuccess {
    request: ViewRequest;
    type: types.APPROVE_VIEW_REQUEST_SUCCESS;
}

export const ApproveViewRequestSuccessCreator = (request: ViewRequest): ApproveViewRequestSuccess => ({
    request,
    type: types.APPROVE_VIEW_REQUEST_SUCCESS,
});

export interface DenyViewRequest {
    requestId: string;
    type: types.DENY_VIEW_REQUEST;
}

export const DenyViewRequestCreator = (requestId: string): DenyViewRequest => ({
    requestId,
    type: types.DENY_VIEW_REQUEST,
});

export interface DenyViewRequestSuccess {
    request: ViewRequest;
    type: types.DENY_VIEW_REQUEST_SUCCESS;
}

export const DenyViewRequestSuccessCreator = (request: ViewRequest): DenyViewRequestSuccess => ({
    request,
    type: types.DENY_VIEW_REQUEST_SUCCESS,
});

export interface ViewRequestFailAction {
    err: Error;
    type: types.VIEW_REQUEST_ACTION_FAIL;
}

export const ViewRequestFailActionCreator = (err: Error): ViewRequestFailAction => ({
    err,
    type: types.VIEW_REQUEST_ACTION_FAIL,
});

export type ViewRequestDataActions =
    GetMyViewRequests |
    GetMyViewRequestsSuccess |
    GetSentViewRequests |
    GetSentViewRequestsSuccess |
    SendViewRequest |
    SendViewRequestSuccess |
    ApproveViewRequest |
    ApproveViewRequestSuccess |
    DenyViewRequest |
    DenyViewRequestSuccess |
    ViewRequestFailAction;
