import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private login: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.auth.getItem();
    if (token) {
      this.login.isLogedIn = true;
      return true;
    } else {
      this.login.isLogedIn = true;
      this.router.navigate(['']);
      return false;
    }
  }
}
