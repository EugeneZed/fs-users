import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router';
import homeReducer from './reducers/home';
import reactimate from 'reactimate';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

const composeEnhancers =
  (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares = [thunk, routerMiddleware(browserHistory)];

export default createStore(
  combineReducers({
    home:homeReducer,
    routing: routerReducer,
    transitions: reactimate.transitionReducer,
    form: formReducer
  }),
  composeEnhancers(
      applyMiddleware(...middlewares)
    )
)
