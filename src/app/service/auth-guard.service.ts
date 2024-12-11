import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiToLocalstorageService } from './api-to-localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router , private ApiToLocalstorageService : ApiToLocalstorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (currentUser) {
        return true; // If logged in, allow access
      } else {
        this.router.navigate(['/login']); // Otherwise, redirect to login page
        return false;
      }
    }
    return true
  }
}
