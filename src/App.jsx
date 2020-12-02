import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import Home from './home';
import Classroom from './classroom';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/classroom">Classroom</Link>
          </li>
        </ul>
        <Switch>
          <Route eact path="/">
            <Home />
          </Route>
          <Route path="/classroom">
            <Classroom />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
