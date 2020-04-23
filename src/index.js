import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router } from "react-router-dom";
// import $ from 'jquery';
// import Popper from 'popper.js';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
serviceWorker.unregister();
