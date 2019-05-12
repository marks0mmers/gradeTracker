import { connectRouter, routerMiddleware, RouterState } from "connected-react-router";
import { createContext, ReactChild } from "react";
import React from "react";
import { AnyAction, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/observable/dom/ajax";
import history from "./history";
import { rootEpic } from "./rootEpic";
import { rootReducer, RootState } from "./rootReducer";

const epicMiddleware = createEpicMiddleware({
    dependencies: {
        ajaxDelete: ajax.delete,
        ajaxGet: ajax.get,
        ajaxGetJSON: ajax.getJSON,
        ajaxPost: ajax.post,
        ajaxPut: ajax.put,
    },
});

const composeEnhancers = composeWithDevTools({
    //
});

const connectRouterCreator = connectRouter(history);
export const connectedReducer = connectRouterCreator<RootState>(rootReducer);

export const store = createStore<RootState, AnyAction, {}, {router: RouterState}>(
    connectedReducer,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            epicMiddleware,
        ),
    ),
);

export type CombinedState = RootState & {router: RouterState};

epicMiddleware.run(rootEpic);

export const ReduxStoreContext = createContext(store);

interface ReduxProviderProps {
    store: typeof store;
    children: ReactChild;
}

export const ReduxProvider = (props: ReduxProviderProps) => (
    <ReduxStoreContext.Provider value={store}>
        {props.children}
    </ReduxStoreContext.Provider>
);
