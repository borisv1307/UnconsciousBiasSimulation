import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import CreateProfile from "./components/createProfile/createProfile";

ReactDOM.render(
  <React.StrictMode>
    <CreateProfile />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
