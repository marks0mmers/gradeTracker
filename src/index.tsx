import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-select/dist/react-select.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import history from "./state/history";
import { store } from "./state/store";
import registerServiceWorker from "./util/registerServiceWorker";
import ConnectedThemeProvider from "./views/containers/ConnectedThemeProvider";
import Layout from "./views/Layout";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedThemeProvider>
            <ConnectedRouter history={history}>
                <Layout />
            </ConnectedRouter>
        </ConnectedThemeProvider>
    </Provider>,
    document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
