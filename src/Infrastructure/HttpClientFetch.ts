import axios, { AxiosBasicCredentials } from 'axios';
import { HttpClientInterface } from '../Domain/HttpClientInterface';
import { HttpRequest } from '../Domain/HttpRequest';
import { HttpResponse } from '../Domain/HttpResponse';

export class HttpClientFetch implements HttpClientInterface {
  async get(req: HttpRequest): Promise<HttpResponse> {
    try {
      let auth: AxiosBasicCredentials | undefined = undefined;
      if (req.username && req.password) {
        auth = {
          username: req.username,
          password: req.password
        };
      }

      const { data, status } = await axios.get(req.url, {
        headers: {
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
        },
        auth: auth
      });
      return Promise.resolve({
        statusCode: status,
        body: typeof data === 'string' ? data : JSON.stringify(data)
      });
    } catch (e: any) {
      if (e && e.response && e.response.status) {
        return Promise.resolve({
          statusCode: e.response.status,
          body: ''
        });
      } else {
        return Promise.resolve({
          statusCode: 500,
          body: ''
        });
      }
    }
  }

  async post(req: HttpRequest): Promise<HttpResponse> {
    try {
      let auth: AxiosBasicCredentials | undefined = undefined;
      if (req.username && req.password) {
        auth = {
          username: req.username,
          password: req.password
        };
      }
      const { data, status } = await axios.post(req.url, req.body, {
        headers: {
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
          'Content-Type': 'application/json'
        },
        auth: auth
      });
      return Promise.resolve({
        statusCode: status,
        body: typeof data === 'string' ? data : JSON.stringify(data)
      });
    } catch (e: any) {
      if (e && e.response && e.response.status) {
        return Promise.resolve({
          statusCode: e.response.status,
          body: ''
        });
      } else {
        return Promise.resolve({
          statusCode: 500,
          body: ''
        });
      }
    }
  }
}
