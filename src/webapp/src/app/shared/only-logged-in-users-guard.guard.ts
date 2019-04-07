import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUsersGuardGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("User logged in?");
    if (this.authService.getToken() != null) {
      return true;
    } // TODO use isAuthenticated
    console.log("not logged in!");
    return false;
  }
}
