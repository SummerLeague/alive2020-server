import React from "react";
import { Router, Route, browserHistory } from "react-router";

import Home from "./components/Home";
import Account from "./components/Account";
import { UserShow } from "./components/User";


const Routes = (props) => (
  <Router {...props} history ={ browserHistory }>
    <Route path="/" component={ Home }/>
  	<Route path="/account/new" component={ Account }/>
  	<Route path="/account/login" component={ Account }/>
  	<Route path="/:username" component={ UserShow }/>
  </Router>
);


export default Routes;
