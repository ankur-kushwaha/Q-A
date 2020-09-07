import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {EventProvider} from './context/eventContext';

import Home from './screen/Home'
import EventPage from './screen/EventPage'
 
function App(){ 
  return(
    <EventProvider>
      <Router>
        <Switch>
          <Route path="/event/:eventId">
            <EventPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </EventProvider>
  )
}

export default App;


