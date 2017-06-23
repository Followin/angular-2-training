import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import Author from '../models/author';
import { Observable } from 'rxjs';

@Injectable()
export default class AuthorService {
  constructor(
    private http: Http,
  ) { }

  public get(): Observable<Author[]> {
    return this.http.get(`${__API__}/authors`).map(response => response.json());
  }
}