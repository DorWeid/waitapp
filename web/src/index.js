import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.css";
import "react-select/dist/react-select.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "./index.css";
import { Provider } from "mobx-react";
import MainStore from "./stores";
import DevTools from "mobx-react-devtools";
import Routes from "./routes";

if (process.env.NODE_ENV === "development") {
  window.store = MainStore;
}

ReactDOM.render(
  <div className="app-container">
    <Provider store={MainStore}>
      <Routes />
    </Provider>
    {process.env.NODE_ENV === "development" && <DevTools />}
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
