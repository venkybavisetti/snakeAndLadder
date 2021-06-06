import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Board from '../components/Board';
import PlayerInfo from '../components/PlayerInfo';
import Login from '../components/Login';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/board" component={Board} />
      <Route exact path="/player-info" component={PlayerInfo} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
};

export default AppRoutes;
