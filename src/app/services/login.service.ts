import {Observable, BehaviorSubject} from 'rxjs';

export default class LoginService {
  private static fakeUserName: string = 'Fakeuser';
  private static storageKey: string = 'login';

  private userNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem(LoginService.storageKey),
  );

  public get userName(): Observable<string> {
    return this.userNameSubject.asObservable();
  }

  public login(): void {
    localStorage.setItem(LoginService.storageKey, LoginService.fakeUserName);

    this.userNameSubject.next(LoginService.fakeUserName);
  }

  public logout(): void {
    localStorage.removeItem(LoginService.storageKey);

    this.userNameSubject.next(null);
  }
}
