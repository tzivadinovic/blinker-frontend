import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private userToken: any;
  private token: string;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    try {
      this.token = localStorage.getItem('userToken');
      this.userToken = jwt_decode(this.token);
    } catch (e) {
      console.error('Not logged in.');
    }
  }

  get userRoles(): string[] {
    return this.userToken.roles;
  }

  get userJwtToken(): string {
    return this.token;
  }

  get isLoggedIn(): boolean {
    return !!this.userJwtToken;
  }

  login(username: string, password: string): void {
    this.http.post(`${environment.apiUrl}/login`, {username, password}, {responseType: 'text'}).subscribe(token => {
      if (token) {
        this.userToken = jwt_decode(token);
        this.token = token;
        localStorage.setItem('userToken', token);
        this.router.navigate(['upis-sati']);
      }
    }, error => {
      this.openSnackBar(error.error, 'Zatvori');
    });


  }

  logout(): void {
    this.userToken = undefined;
    this.token = '';
    localStorage.removeItem('userToken');
    this.router.navigate(['']);
  }

  isCEO(): boolean {
    return this.userRoles.includes('ROLE_CEO');
  }

  isScholar(): boolean {
    return this.userRoles.includes('ROLE_SCHOLAR');
  }

  isProjectManager(): boolean {
    return this.userRoles.includes('ROLE_PROJECT_MANAGER');
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
