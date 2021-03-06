import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Routes
import App from "../components/App";
import About from "../components/About";
import NotFound from "../components/NotFound";

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={App}/>
      <Route exact path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
