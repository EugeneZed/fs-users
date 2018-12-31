// File that manages the render of all pages (GET Requests)


import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';
import {routes} from '../client/js/Routes';
import store from '../client/js/store';
import NotFoundPage from '../client/js/components/NotFoundPage';
import passport from 'passport';
import includes from 'lodash/includes';
const publicPaths = ["/login", "/register"]

function authenticateIfNeeded (req,res,next){
/*
   -- This middleware function will check if the requested path is public.
   -- If so, it will call next();
   -- Else, if the path is private, it will call Passport's JWT Strategy to
      authenticate.
   -- If able to authenticate, next middlware, else redirect to /login.
*/
  if(includes(publicPaths, req.url)){ // check if path is public
    next();
  }
  else{
    // console.log("authenticating protected route")
    passport.authenticate('jwt', function(err, user, info) { //authenticate
      // console.log("authenticated:")
      // console.log(err)
      // console.log(user)
      // console.log(info)
      if (err) { return next(err); }
      if (!user) { console.log("redirecting to /login"); return res.redirect('/login'); }
      req.user = user; // append user to request so next middleware has access
      next();

    })(req,res,next);
  }
}

function matchRouteAndRender (req,res,next){
  /*
     -- This middleware function will perform a server-side render of the
        requested route.
     -- First, using react-router's match function, it will capture the correct
        components to be rendered
        TODO: finish this documentation. Figure out how to update the store with the user.
        

  */
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
      // if the current route matched we have renderProps
      if (renderProps) {

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
}

export default function (app) {
  app.get('*', authenticateIfNeeded,matchRouteAndRender);
}
