import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-banker-list',
  imports: [FormsModule],
  templateUrl: './banker-list.component.html',
  styleUrl: './banker-list.component.css'
})
export class BankerListComponent {
  user = {
    username: '',
    email: '',
    fullName: '',
    password: ''
  };

  saveUser(): void {
    console.log('Saving user:', this.user);
    // Add save logic here
  }

  updateUser(): void {
    console.log('Updating user:', this.user);
    // Add update logic here
  }

  resetForm(): void {
    this.user = {
      username: '',
      email: '',
      fullName: '',
      password: ''
    };
  }
}
