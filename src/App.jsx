import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound, Home } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
