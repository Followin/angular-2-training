import { Component } from '@angular/core';
import LoginService from '../../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
})
export default class LoginComponent {
  private loggedIn: boolean;
  private userName: string;

  constructor(
    private loginService: LoginService,
  ) { }

  public logout(): void {
    this.loginService.logout();
  }
}
