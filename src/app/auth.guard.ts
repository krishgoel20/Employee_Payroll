import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    const userRole = localStorage.getItem('userRole');
    console.log("route.data", route.data['roles']);

    // Check if the userRole is set in localStorage
    if (userRole) {
      // Check if the user is allowed to access the route based on their role
      console.log("route.data", route.data);
      
      if ( route.data['roles'].includes(userRole)) {
        return true; // Allow access
      } else {
        // Redirect to unauthorized page or any other desired route
        this.router.navigate(['/unauthorized']);
        return false; // Prevent access
      }
    } else {
      // Redirect to login page or any other desired route
      this.router.navigate(['/']);
      return false; // Prevent access
    }
  }
  
}
