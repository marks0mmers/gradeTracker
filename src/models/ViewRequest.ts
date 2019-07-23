import { Record, RecordOf } from "immutable";
interface IViewRequest {
    requester: string;
    receiver: string;
    status: number;
    id: string;
}

export const ViewRequest = Record<IViewRequest>({
    receiver: "",
    requester: "",
    status: 0,
    id: "",
});

export type ViewRequest = RecordOf<IViewRequest>;

export const ViewRequestStatus = {
    1: "Sent",
    2: "Approved",
    3: "Denied",
};
