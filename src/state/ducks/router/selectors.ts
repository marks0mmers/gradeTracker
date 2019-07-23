import { RootState } from "../../../state/rootReducer";

export const getRouterState = (state: RootState) => state.router;
export const getPathName = (state: RootState) => state.router.location.pathname;
export const getPreviousRoute = (state: RootState) => state.router.location.state;
