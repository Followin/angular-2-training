import { Component } from '@angular/core';
import { Router } from '@angular/router';
import LoginService from '../../services/login.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  public login(): void {
    this.loginService.login();
    this.router.navigate(['/courses']);
  }
}
