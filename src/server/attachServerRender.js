import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';
import {routes} from '../client/js/Routes';
import store from '../client/js/store';
import NotFoundPage from '../client/js/components/NotFoundPage';

export default function (app) {
  app.get('*', (req, res) => {
    match(
      { routes: routes, location: req.url },
      (err, redirectLocation, renderProps) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        if (redirectLocation) {
          return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        // generate the React markup for the current route
        let markup;
        if (renderProps) {
          // if the current route matched we have renderProps
          var InitialComponent = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
          );
          markup = renderToString(InitialComponent);
        } else {
          // otherwise we can render a 404 page
          markup = renderToString(<NotFoundPage/>);
          res.status(404);
        }
        // render the index template with the embedded React markup
        return res.render('index', { markup });
      }
    );
  });

}
