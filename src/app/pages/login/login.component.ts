import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showRegisterForm = signal<boolean>(false);
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  customerObj: any = {
    "userId": 0,
    "userName": '',
    "email": '',
    "fullName": '',
    "password": ''
  };

 loginObj: any = {
  "userName": '',
  "password": ''
 }

  changeView() {
    this.showRegisterForm.set(!this.showRegisterForm())
  }

  onLogin() {
    try {
      const loggedInUser = this.userService.login(this.loginObj.userName, this.loginObj.password);
      alert('Login Successful');
      this.router.navigate(['/loan-application-list'])
    } catch (error:any) {
      alert(error.message);
    }
  }

  onRegister() {
    try {
      this.userService.register(this.customerObj);
    alert('Registration Successful');
    this.showRegisterForm.set(false);
    } catch (error:any) {
      alert(error.message)
    }
  }

} 
