import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {Http} from '@angular/http';

@Injectable()
export default class LoginService {
  private userNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private http: Http,
  ) {
    this.http.get(`${__API__}/auth`).subscribe(response => {
      this.userNameSubject.next(response.json().name);
    });
  }

  public get userName(): Observable<string> {
    return this.userNameSubject.asObservable();
  }

  public login(login: string, password: string): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.http.post(`${__API__}/auth`, { login, password }).subscribe(response => {
        localStorage.setItem(__TOKEN_KEY__, response.json().token);

        subscriber.next(true);
        subscriber.complete();

        this.userNameSubject.next(response.json().name);
      }, () => {
        subscriber.next(false);
        subscriber.complete();
      });
    });

  }

  public logout(): void {
    localStorage.removeItem(__TOKEN_KEY__);

    this.userNameSubject.next(null);
  }
}
