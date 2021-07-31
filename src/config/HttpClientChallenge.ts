import HttpClient from '../api/HttpClient';

export default class HttpClientChallenge extends HttpClient {
  protected constructor() {
    const baseURL = process.env.API_CHALLENGE;
    super(baseURL, {});
  }
}
