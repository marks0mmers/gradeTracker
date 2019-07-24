import { Record, RecordOf } from "immutable";
import { LoadingMaskActions } from "./actions";
import { LoadingMaskTypes as types} from "./types";

interface ILoadingMaskState {
    isLoading: boolean;
}

export const LoadingMaskState = Record<ILoadingMaskState>({
    isLoading: false,
});

export type LoadingMaskState = RecordOf<ILoadingMaskState>;

export const LoadingMaskReducer = (
    state = new LoadingMaskState(),
    action: LoadingMaskActions,
) => {
    switch (action.type) {
        case types.SHOW_LOADING_MASK:
            return state.set("isLoading", true);
        case types.HIDE_LOADING_MASK:
            return state.set("isLoading", false);
        default:
            return state;
    }
};
