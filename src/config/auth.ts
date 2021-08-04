import Constants from '../constants/Constants';

export default {
  jwt: {
    secret: Constants.APP_SECRET,
    expiresIn: '1d',
  },
};
