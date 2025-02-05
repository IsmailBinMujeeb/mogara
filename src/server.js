import express from 'express';
import router from './routes/routes.js';
import morganLogger from './middlewares/loggerMiddleware.js';

const app = express();
const PORT = 2577;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganLogger);

app.use('/', router);

app.listen(PORT);

export default app;