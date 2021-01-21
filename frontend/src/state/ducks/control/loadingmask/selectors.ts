import { RootState } from "../../../rootReducer";

export const getIsLoading = (state: RootState) => state.control.loadingMask.isLoading;
