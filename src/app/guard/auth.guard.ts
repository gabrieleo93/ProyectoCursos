import {AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { RangeValueAccessor } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';


export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
  const authService= inject(AuthService)
  const router = inject(Router)
  if( authService.isLoggedIn()){
    return authService.isLoggedIn();
  }else{
    return router.navigateByUrl('')
  }

}
