import {Component, ChangeDetectionStrategy} from '@angular/core';
import { Router } from '@angular/router';
import LoginService from '../../services/login.service';
import LoaderService from '../../services/loader.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private loader: LoaderService,
  ) { }

  public login(): void {
    this.loader.show();
    this.loginService.login('admin', 'admin').subscribe(result => {
      this.router.navigate(['/courses']);
      this.loader.hide();
    });
  }
}
