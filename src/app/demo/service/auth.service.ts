// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { User } from 'src/app/demo/api/user'; // Import the User interface

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   login(email: string, password: string): Observable<{ token: string, user: User }> {
//     return this.http.post<{ token: string, user: User }>(`${this.apiUrl}=login`, { email, password });
//   }

 
//   getToken(): string | null {
//     return localStorage.getItem('token');
// }

//   isLoggedIn(): boolean {
//       return !!this.localStorage.getItem('token');
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}=login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}