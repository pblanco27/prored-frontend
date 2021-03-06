import React from "react";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
serviceWorker.unregister();
