import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    const auth = JSON.parse(localStorage.getItem('token')) as boolean;
    // Check whether the token is expired and return
    // true or false
    return auth === true;
  }
}
