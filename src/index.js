import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "mobx-react";
import TasksStore from "./store/tasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stores = {
  TasksStore,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider {...stores}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
