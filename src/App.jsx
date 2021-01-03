import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import Home from './home';
import Classroom from './classroom';

function App() {
  const rooms = process.env.REACT_APP_ROOMS.split(',');

  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">空氣一吉棒</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              { rooms.map((roomId) => <Link key={roomId} className="nav-link" to={`/${roomId}`}>{roomId}</Link>) }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/:roomID">
            <Classroom />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
