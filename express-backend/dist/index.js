import dotenv from 'dotenv';
import express from 'express';
import morganMiddleware from './logger/morganMiddleware.js';
import routes from './routes/routes.js';
dotenv.config();
// create express app
const app = express();
// use custom middlewares for logs and json convert
app.use(express.json());
app.use(morganMiddleware);
// apply routes
app.use(routes);
app.get('/', (req, res) => {
    res.send('Application work!');
});
app.listen(process.env.PORT, () => {
    console.log('server is running');
});
//# sourceMappingURL=index.js.map