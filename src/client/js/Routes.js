import React from 'react';
import { Route, IndexRoute } from 'react-router'
import Login from './components/login/Login';
import Register from './components/register/Register';
import FirstStudioContainer from './components/FirstStudioContainer';
import {TransitionContainer} from 'reactimate'
    export let routes = (
      <Route path="/" component={FirstStudioContainer}>
        <IndexRoute component={Register} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
      </Route>
    )
