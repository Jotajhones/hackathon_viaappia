import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private apiUrl = `${environment.API_BASE_URL}/auth/login`;

  login(credentials: any) {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      tap(response => {

        this.cookieService.set('access_token', response.token, {
          expires: 1,
          secure: false, 
          sameSite: 'Lax'
        });

        if (credentials.email) {
          localStorage.setItem('user_email', credentials.email);
        }
      })
    );
  }

  logout() {
    this.cookieService.delete('access_token');
    localStorage.removeItem('user_email');
  }

  getToken(): string {
    return this.cookieService.get('access_token');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('user_email');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false; 
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        this.logout();
        return false;
      }

      return true;

    } catch (error) {
      console.error('Token malformado ou inválido', error);
      this.logout();
      return false;
    }
  }
}