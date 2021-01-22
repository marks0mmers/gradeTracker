import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/internal-compatibility";
import { rootEpic } from "./rootEpic";
import { rootReducer } from "./rootReducer";

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

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            epicMiddleware,
        ),
    ),
);

epicMiddleware.run(rootEpic);
