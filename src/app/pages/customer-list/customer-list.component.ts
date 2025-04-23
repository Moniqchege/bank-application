import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  imports: [ CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  users = [
    {
      username: 'pranjali',
      email: 'pranju@gmail.com',
      fullName: 'deshmukh',
      role: 'BankEmployee',
      createdDate: '2025-01-15T11:44:15.267',
      password: '1234',
      projectName: 'BankLoan'
    }
  ];

  editUser(user: any): void {
    console.log('Editing user:', user);
  }

  deleteUser(user: any): void {
    console.log('Deleting user:', user);
  }

  submit(): void {
    console.log('Submit clicked');
  }
}
