import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Routes
import App from "../components/App";
import About from "../components/About";
import NotFound from "../components/NotFound";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}


const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={() => (<AlertProvider template={AlertTemplate} {...options}><App /></AlertProvider>)}/>
      <Route exact path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
