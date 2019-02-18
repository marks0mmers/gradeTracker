import { RootState } from "../../../state/rootReducer";

export const getPathName = (state: RootState) => state.router.location.pathname;
