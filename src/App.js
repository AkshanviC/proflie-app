import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Edit from "./Edit";
import Output from "./Output";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/output/:id" component={Output} />
        <Route path="/:id" component={Edit} />
        <Route path="/" component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
