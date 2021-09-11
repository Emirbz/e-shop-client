import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const isVisited = JSON.parse(localStorage.getItem('isVisited')) as boolean;
    if (isVisited === null || isVisited === false) {
      if (state.url.includes('landing')){
        return true;
      }
      this.router.navigate(['/landing']);
      return false;
    }
    if (isVisited === true) {
      if (state.url.includes('landing')) {
        this.router.navigate(['/shop']);
        return false;
      }
      return true;

    }
    return true;
  }

}
