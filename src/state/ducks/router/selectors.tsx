import { CombinedState } from "src/state/store";

export const getPathName = (state: CombinedState) => state.router.location.pathname;
export const getPreviousRoute = (state: CombinedState) => state.router.location.state;
