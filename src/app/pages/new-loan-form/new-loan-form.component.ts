import { Component, OnInit } from '@angular/core';
import { LoanDetail, LoanService } from '../../services/loan.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-loan-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-loan-form.component.html',
  styleUrls: ['./new-loan-form.component.css']
})
export class NewLoanFormComponent implements OnInit {
  loanDetails: LoanDetail[] = [];
  selectedLoanIndex: number | null = null;

  // Personal Details
  fullName = '';
  idNumber = '';

  // Loan Details
  bankName = '';
  loanType = '';
  loanStatus = '';
  loanAmount: number = 0;
  emi: number = 0;

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.loanService.loanDetails$.subscribe(data => {
      this.loanDetails = data;
      console.log('Updated loan list:', data);
    });
  }

  addLoan() {
    console.log('addLoan called');
    if (this.bankName && this.loanAmount && this.emi && this.loanType && this.loanStatus) {
      const newLoan: LoanDetail = {
        bankName: this.bankName,
        loanType: this.loanType,
        loanAmount: this.loanAmount,
        emi: this.emi,
        loanStatus: this.loanStatus,
        fullName: this.fullName,
        idNumber: this.idNumber
      };

      this.loanService.addLoanDetail(newLoan);
      this.resetForm();
    } else {
      console.warn('Missing input values');
    }
  }

  resetForm() {
    this.bankName = '';
    this.loanAmount = 0;
    this.emi = 0;
    this.loanType = '';
    this.loanStatus = '';
  }

  editLoan(index: number) {
    this.selectedLoanIndex = index;
    const loanToEdit = this.loanDetails[index];
    this.bankName = loanToEdit.bankName;
    this.loanType = loanToEdit.loanType;
    this.loanAmount = loanToEdit.loanAmount;
    this.emi = loanToEdit.emi;
    this.loanStatus = loanToEdit.loanStatus;
  }

  updateLoan(index: number) {
    const updatedLoan: LoanDetail = {
      bankName: this.bankName,
      loanType: this.loanType,
      loanAmount: this.loanAmount,
      emi: this.emi,
      loanStatus: this.loanStatus,
      idNumber: this.idNumber,
      fullName: this.fullName
    };

    this.loanService.updateLoanDetail(index, updatedLoan);
    this.selectedLoanIndex = null;
    this.resetForm();
  }

  deleteLoan(index: number) {
    this.loanService.deleteLoanDetail(index);
  }
}
