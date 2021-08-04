import mongoose from 'mongoose';
import Constants from '../constants/Constants';
import logger from '../log/logger';

require('dotenv/config');

const url = `mongodb+srv://${Constants.DATABASE_HOST}`;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.Promise = global.Promise;

// Habilita log de querys
mongoose.set('debug', true);

export default mongoose
  .connect(url, options)
  .then(() => {
    logger.info('[application] Connection to DB successful', {
      field: '[application]',
    });
  })
  .catch(async err => {
    logger.error('[application] error connection to DB failure', {
      field: '[application]',
      err,
    });
  });
