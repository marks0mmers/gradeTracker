import { ConnectedRouter } from "connected-react-router";
import React from "react";
import * as ReactDOM from "react-dom";
import ReactModal from "react-modal";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import history from "./state/history";
import { store } from "./state/store";
import Layout from "./views/Layout";

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout />
        </ConnectedRouter>
    </Provider>
), document.getElementById("root") as HTMLElement,
);
ReactModal.setAppElement("body");
