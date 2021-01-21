import { inject, injectable } from "inversify";
import TYPES from "../config/types";
import { ViewRequestException } from "../exceptions/ViewRequestException";
import { ViewRequest } from "./view-request.model";
import { ViewRequestRepository } from "./view-request.repository";
import { ViewRequestDTO } from "./view-request.schema";
import { ViewRequestStatus } from "./view-request.statuses";

export interface ViewRequestManager {
    getAllForReceiver(receiverId: string): Promise<ViewRequest[]>;
    getAllForRequester(requesterId: string): Promise<ViewRequest[]>;
    checkIfRequestExists(requesterId: string, receiverId: string): Promise<ViewRequest>;
    sendUserViewRequest(currentUserId: string, userToRequest: string): Promise<ViewRequest>;
    approveViewRequest(requestId: string, currentUserId: string): Promise<ViewRequest>;
    denyViewRequest(requestId: string, currentUserId: string): Promise<ViewRequest>;
}

@injectable()
export class ViewRequestManagerImpl implements ViewRequestManager {

    @inject(TYPES.ViewRequestRepository)
    private viewRequestRepository: ViewRequestRepository;

    public async getAllForReceiver(receiverId: string): Promise<ViewRequest[]> {
        return await this.viewRequestRepository.findAll()
            .then((requests) => requests.map((r) => toViewRequest(r)))
            .then((requests) => requests.filter((r) => r.receiver === receiverId));
    }
    public async  getAllForRequester(requesterId: string): Promise<ViewRequest[]> {
        return await this.viewRequestRepository.findAll()
            .then((requests) => requests.map((r) => toViewRequest(r)))
            .then((requests) => requests.filter((r) => r.requester === requesterId));
    }

    public async checkIfRequestExists(requesterId: string, receiverId: string) {
        const allForRequester =  await this.getAllForRequester(requesterId);
        const req = allForRequester.find((vr) => vr.receiver === receiverId);
        if (!req) {
            throw new ViewRequestException("You do not have that users permission");
        }
        return req;
    }

    public async sendUserViewRequest(currentUserId: string, userToRequest: string): Promise<ViewRequest> {
        const newRequest: ViewRequestDTO = {
            requester: currentUserId,
            receiver: userToRequest,
            status: ViewRequestStatus.SENT
        };

        return await this.viewRequestRepository.create(newRequest)
            .then((request) => toViewRequest(request));
    }
    public async approveViewRequest(requestId: string, currentUserId: string): Promise<ViewRequest> {
        const requestToApprove = await this.viewRequestRepository.find(requestId);

        if (requestToApprove.receiver !== currentUserId) {
            throw new ViewRequestException("Cannot Approve a Request that is not yours");
        }

        requestToApprove.status = ViewRequestStatus.APPROVED;

        return await this.viewRequestRepository.update(requestToApprove)
            .then((request) => toViewRequest(request));
    }
    public async denyViewRequest(requestId: string, currentUserId: string): Promise<ViewRequest> {
        const requestToApprove = await this.viewRequestRepository.find(requestId);

        if (requestToApprove.receiver !== currentUserId) {
            throw new ViewRequestException("Cannot Deny a Request that is not yours");
        }

        requestToApprove.status = ViewRequestStatus.DENIED;

        return await this.viewRequestRepository.update(requestToApprove)
            .then((request) => toViewRequest(request));
    }

}

const toViewRequest = (dto: ViewRequestDTO) => {
    return new ViewRequest(dto.requester, dto.receiver, dto.status, dto._id);
};
