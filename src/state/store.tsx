import { connectRouter, routerMiddleware } from "connected-react-router";
import { applyMiddleware, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/observable/dom/ajax";
import history from "./history";
import { rootEpic } from "./rootEpic";
import { rootReducer } from "./rootReducer";

import { composeWithDevTools } from "redux-devtools-extension";

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

export const connectedReducer = connectRouter(history)(rootReducer);

export const store = createStore (
    connectedReducer,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            epicMiddleware,
        ),
    ),
);

epicMiddleware.run(rootEpic);
