import path from 'path';
import { Server } from 'http';
import Express from 'express';
import BodyParser from 'body-parser';
import attachServerRender from './attachServerRender';
import Knex from 'knex';
import knexConfig from './knexfile';
import {Model} from 'objection';

const app = new Express();
const server = new Server(app);
const knex = Knex(knexConfig);
Model.knex(knex);

app.set('view engine', 'ejs')
   .set('views', path.join(__dirname, '../client/views'))
   .use(Express.static(path.join(__dirname, '../client/www')))
   .use(BodyParser.json()) // support json encoded bodies
   .use(BodyParser.urlencoded({ extended: true })); // support encoded bodies
attachServerRender(app);

const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || 'production';

server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});