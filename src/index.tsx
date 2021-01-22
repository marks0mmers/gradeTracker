import * as ReactDOM from "react-dom";
import ReactModal from "react-modal";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { store } from "./state/store";
import Layout from "./views/Layout";

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>
), document.getElementById("root") as HTMLElement,
);
ReactModal.setAppElement("body");
