import { RootState } from "../../../rootReducer";

export const getMyViewRequests = (state: RootState) => state.data.viewRequest.myViewRequests;
export const getSentViewRequests = (state: RootState) => state.data.viewRequest.pendingViewRequests;
