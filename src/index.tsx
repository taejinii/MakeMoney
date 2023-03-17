import ReactDOM from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import GlobalModals from "./components/modals/GlobalModals";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <GlobalModals />
    <App />
  </Provider>
);
