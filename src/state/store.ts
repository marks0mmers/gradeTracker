import { routerMiddleware, RouterState } from "connected-react-router";
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

export const store = createStore<RootState, AnyAction, {}, {router: RouterState}>(
    rootReducer(history),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            epicMiddleware,
        ),
    ),
);

epicMiddleware.run(rootEpic);
