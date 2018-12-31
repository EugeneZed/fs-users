import path from 'path';
import { Server } from 'http';
import Express from 'express';
import BodyParser from 'body-parser';
import attachServerRender from './attachServerRender';
import Knex from 'knex';
import knexConfig from './knexfile';
import {Model} from 'objection';
import * as models from './models';
import passport from 'passport';
import configurePassport from './configurePassport';
import JWT from 'jsonwebtoken';
const app = new Express();
const server = new Server(app);
const knex = Knex(knexConfig.development);
Model.knex(knex);
// console.log(models);

// models.User.query().insertGraph({
//   localAuth:{
//     firstName: "Jay",
//     lastName: "Sridharan",
//     email: "jayasurya.sridharan@gmail.com"
//   }
// }).then(function(me){
//   console.log(me.id);
// });
configurePassport(passport);
app.set('view engine', 'ejs')
   .set('views', path.join(__dirname, '../client/views'))
   .use(Express.static(path.join(__dirname, '../client/www')))
   .use(BodyParser.json()) // support json encoded bodies
   .use(BodyParser.urlencoded({ extended: true })) // support encoded bodies
   .use(passport.initialize());

function serialize(req, res, next) {
 db.updateOrCreate(req.user, function(err, user){
   if(err) {return next(err);}
   // we store the updated information in req.user again
   req.user = {
     id: user.id
   };
   next();
 });
}

const db = {
 updateOrCreate: function(user, cb){
   // db dummy, we just cb the user
   cb(null, user);
 }
};
function generateToken(req, res, next) {
  req.token = JWT.sign({
    id: req.user.id,
  }, require('./secrets'), {
    expiresInMinutes: 120
  });
  next();
}
function respond(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}

app.post('/authorizeLocal', passport.authenticate(
 'local', {
   session: false
 }), serialize, generateToken, respond);

attachServerRender(app);
app.get("/", function(req, res) {
  res.json({message: "Express is up!"});
});
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
