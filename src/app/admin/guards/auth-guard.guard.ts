import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}


  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/admin/login']);
      return false;
    }
    return true;
  }

}
