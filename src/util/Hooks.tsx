import { useEffect, useReducer } from "react";

// tslint:disable:no-any
export const useComponentMount = (fn: () => (void | (() => void | undefined))) => useEffect(() => fn(), []);
export const useComponentUpdate = (
    fn: () => (void | (() => void | undefined)),
    deps?: any[],
) => useEffect(() => fn(), deps);

const forcedReducer = (state: {}) => !state;
export const useForceUpdate = () => useReducer(forcedReducer, false)[1];
