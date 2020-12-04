import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppWithRedux from "./app/App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
