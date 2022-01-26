import express, { Application } from 'express';
import morgan from 'morgan';
import routes from './routes/routes';

const app: Application = express();
// settings
app.set('port', 4041);
// middlewares
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/', routes);
export default app;