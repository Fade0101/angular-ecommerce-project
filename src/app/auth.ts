import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 
  private currentUser: any = null;

  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    // Check memory on refresh
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      this.currentUser = { role: savedRole };
      this.isLoggedIn$.next(true);
      this.isAdmin$.next(savedRole === 'admin');
    }
  }

  registerUser(email: string, password: string) {
    const newUser = { email: email, password: password, role: 'user' };
    return this.http.post(this.apiUrl, newUser);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          this.currentUser = user;
          localStorage.setItem('userRole', this.currentUser.role);
          
          this.isLoggedIn$.next(true);
          this.isAdmin$.next(this.currentUser.role === 'admin');
          
          if (this.currentUser.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('userRole');
    
    this.isLoggedIn$.next(false);
    this.isAdmin$.next(false);
    
    this.router.navigate(['/login']);
  }

  getRole() {
    return this.currentUser?.role || localStorage.getItem('userRole');
  }

  
  isLoggedIn(): boolean {
    return this.isLoggedIn$.value; 
  }
} 
