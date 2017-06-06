export default class LoginService {
  private static fakeUserName: string = 'Fakeuser';
  private static storageKey: string = 'login';

  public login(): void {
    localStorage.setItem(LoginService.storageKey, LoginService.fakeUserName);
  }

  public logout(): void {
    localStorage.removeItem(LoginService.storageKey);
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem(LoginService.storageKey);
  }

  get userName(): string {
    return localStorage.getItem(LoginService.storageKey);
  }
}
