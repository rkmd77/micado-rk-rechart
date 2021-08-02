import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from './config/config';
import covidCaseRoutes from './routes/covidCasesApi';

const router = express();

/** Log the request */
router.use((req, res, next) => {
  /** Log the req */
  res.on('finish', () => {
    /** Log the res */
  });

  next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** Routes go here */
router.use('/cases', covidCaseRoutes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message
  });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => `Server is running ${config.server.hostname}:${config.server.port}`);
