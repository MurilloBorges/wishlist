import Constants from '../constants/Constants';
import HttpClient from '../api/HttpClient';

export default class HttpClientChallenge extends HttpClient {
  protected constructor() {
    const baseURL = Constants.API_CHALLENGE;
    super(baseURL, {});
  }
}
