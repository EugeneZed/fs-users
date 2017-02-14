import React from 'react';
import { Route, IndexRoute } from 'react-router'
import Home from './components/home/Home';
import {TransitionContainer} from 'reactimate'
    export let routes = (
      <Route path="/" component={TransitionContainer}>
          <IndexRoute component={Home}/>
      </Route>
    )
