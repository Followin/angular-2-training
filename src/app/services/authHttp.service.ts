import { Http, Response, Headers, RequestOptions, Request, RequestOptionsArgs, XHRBackend } from '@angular/http';
import {Observable} from 'rxjs';

export default class AuthHttpService extends Http {
  constructor (backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }

      options.headers.set('Authorization', this.getAuthHeader());
    } else {
      url.headers.set('Authorization', this.getAuthHeader());
    }

    return super.request(url, options);
  }

  private getAuthHeader(): string {
    return localStorage.getItem(__TOKEN_KEY__);
  }
}