import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import NewPlaces from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/places/new" exact>
            <NewPlaces />
          </Route>
          <Route path="/" exact>
            <Users />
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </Router>);
}

export default App;
