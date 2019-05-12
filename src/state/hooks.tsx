import { useContext, useEffect, useRef } from "react";
import { bindActionCreators } from "redux";
import { useForceUpdate } from "src/util/Hooks";
import { CombinedState, ReduxStoreContext } from "./store";

export const useReduxDispatch = () => {
    const store = useContext(ReduxStoreContext);
    return store.dispatch;
};

export const useActions = <T extends {}>(mapDispatch: T): T => {
    const dispatch = useReduxDispatch();
    return bindActionCreators(mapDispatch, dispatch);
};

export const useReduxState = () => {
    const forceUpdate = useForceUpdate();
    const store = useContext(ReduxStoreContext);
    const state = useRef(store.getState());
    useEffect(() => {
        const callback = () => {
            state.current = store.getState();
            forceUpdate({});
        };
        const unsubscribe = store.subscribe(callback);
        return unsubscribe;
    }, []);
    return state.current;
};

export const useSelector = <T extends {}>(
    mapState: (state: CombinedState) => T,
): T => {
    const state = useReduxState();
    return mapState(state);
};
