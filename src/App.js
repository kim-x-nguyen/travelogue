import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import NewPlaces from './places/pages/NewPlace';
import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';




function App() {
  const { REACT_APP_API_KEY } = process.env;
  useEffect(() => {
    // Create the script tag, set the appropriate attributes
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_API_KEY}`;
    script.async = true;
    // Append the 'script' element to 'head'
    document.head.appendChild(script);

    return() => {
      document.head.removeChild(script);
    }

  }, []);


  return (<Router>
    <MainNavigation />
    <main>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlaces />
        </Route>
        <Redirect to='/' />
      </Switch>
    </main>
  </Router>);
}

export default App;
