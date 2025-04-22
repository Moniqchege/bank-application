import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bank-application';
  loggedUserData: any;

  constructor(private userService: UserService, private router: Router) {
    this.userService.loggedInUser$.subscribe(user => {
      this.loggedUserData = user;
    });
  }

  logout() {
    this.userService.logout(); 
    this.router.navigate(['/login']);
  }
  

}
