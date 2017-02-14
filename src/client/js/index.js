import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory,useRouterHistory } from 'react-router'
import { routes } from './Routes';
import { Provider } from 'react-redux';
import store from './store';
render(
  <Provider store={store}>
      <Router routes={routes} history={browserHistory} onUpdate={() => window.scrollTo(0, 0)} />
  </Provider> ,document.getElementById('mount'));
