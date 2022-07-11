import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  realRol!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
   this.realRol= this.tokenService.IsAdmin()? 'admin': 'user';
    if (!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) <0) {
      this.router.navigate(['/portfolio']);
      return false;
    }
    return true;
  }
}