import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-application-list',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './loan-application-list.component.html',
  styleUrl: './loan-application-list.component.css'
})
export class LoanApplicationListComponent {
  applicationForm!: FormGroup;
  applications: any[] = [];
  editedIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      panCard: ['', Validators.required],
      annualIncome: [null, Validators.required],
      employmentStatus: ['', Validators.required],
      applicationStatus: ['Pending', Validators.required],
      creditScore: [null, Validators.required],
      assets: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.applicationForm.valid) {
      const newApplication = this.applicationForm.value;

      if (this.editedIndex !== null) {
        this.applications[this.editedIndex] = newApplication;
        this.editedIndex = null;
      } else {
        this.applications.push(newApplication);
      }

      this.applicationForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  editApplication(application: any) {
    const index = this.applications.indexOf(application);
    if (index !== -1) {
      this.editedIndex = index;
      this.applicationForm.patchValue(application);
    }
  }

  deleteApplication(application: any) {
    const index = this.applications.indexOf(application);
    if (index !== -1) {
      this.applications.splice(index, 1);

      if (this.editedIndex === index) {
        this.editedIndex = null;
        this.applicationForm.reset();
      }
    }
  }
}


