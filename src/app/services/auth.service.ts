import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private userService: UserService) {}

  login(username: string, password: string): boolean {
    // Aquí iría la lógica de autenticación, por ejemplo, llamando a un API
    if (this.userService.login(username, password)) {
      const user = this.userService.getUserByMail();
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }



  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  getLoggedInUserId(): string | null {
    const currentUser = this.getCurrentUser();
    return currentUser  ?currentUser.id : null;
  }
}
