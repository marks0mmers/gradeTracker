import { ViewRequestStatus } from "./view-request.statuses";
export class ViewRequest {
    constructor(
        public requester: string,
        public receiver: string,
        public status: ViewRequestStatus,
        public id?: string
    ) {}
}
