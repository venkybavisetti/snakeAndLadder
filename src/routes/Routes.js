import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Board from '../components/Board';
import Dices from '../components/Dices';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Board} />
      <Route exact path="/dice" component={Dices} />
    </Switch>
  );
};

export default AppRoutes;
