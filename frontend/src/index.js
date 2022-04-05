import React from "react";
import ReactDOM from "react-dom";
// import Provider and store for redux to work
import { Provider } from "react-redux";
import store from "./store.js";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  // Need to wrap the app in the redux provider pass in store
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
