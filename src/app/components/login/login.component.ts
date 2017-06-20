import {Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import LoginService from '../../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private isLoggedIn: boolean;
  private userName: string;

  constructor(
    private loginService: LoginService,
    private ref: ChangeDetectorRef,
  ) {
    this.loginService.userName.subscribe(value => {
      this.isLoggedIn = value !== null;
      this.userName = value;

      ref.markForCheck();
    });
  }

  public logout(): void {
    this.loginService.logout();
    location.reload();
  }
}
