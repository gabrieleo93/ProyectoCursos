import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() { }
  static readonly tokenKey = 'auth_token'; // La clave para el token

  getToken(): string | null {
    return localStorage.getItem(CookieService.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(CookieService.tokenKey, token);
  }

  deleteToken(): void {
    localStorage.removeItem(CookieService.tokenKey);
  }
}
