import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUserSubject.next(JSON.parse(user));
    }
  }


  register(user: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(
      (u: any) =>
        (u.userName || '').trim().toLowerCase() ===
        (user.userName || '').trim().toLowerCase()
    );
    if (exists) throw new Error('User already exists');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  login(userName: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.userName === userName && u.password === password);
    if (!user) throw new Error('Invalid Email or Password');
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.loggedInUserSubject.next(user); 
    return user;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
  }
}
