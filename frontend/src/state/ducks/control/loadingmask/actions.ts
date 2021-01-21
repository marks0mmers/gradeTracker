import { LoadingMaskTypes as types } from "./types";

export interface ShowLoadingMask {
    type: types.SHOW_LOADING_MASK;
}

export const ShowLoadingMaskCreator = (): ShowLoadingMask => ({
    type: types.SHOW_LOADING_MASK,
});

export interface HideLoadingMask {
    type: types.HIDE_LOADING_MASK;
}

export const HideLoadingMaskCreator = (): HideLoadingMask => ({
    type: types.HIDE_LOADING_MASK,
});

export type LoadingMaskActions = ShowLoadingMask | HideLoadingMask;
