import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface LoanDetail {
    fullName: string;
    idNumber: string;
    loanType: string;
    loanStatus: string;
    bankName: string;
    loanAmount: number;
    emi: number;
  }

@Injectable({
    providedIn: 'root'
})

export class LoanService {
    private loanDetailsSubject = new BehaviorSubject<LoanDetail[]>([]);
    loanDetails$ = this.loanDetailsSubject.asObservable();

    private loanDetails: LoanDetail[] = [];

    addLoanDetail(detail: LoanDetail):void{
        this.loanDetails.push(detail);
        this.loanDetailsSubject.next(this.loanDetails);
    }

    getLoanDetails(): LoanDetail[] {
        return this.loanDetails
    }

    clearLoanDetails(): void {
        this.loanDetails = [];
        this.loanDetailsSubject.next(this.loanDetails);
    }

    updateLoanDetail(index: number, updatedLoan: LoanDetail) {
        const current = this.loanDetailsSubject.value;
        current[index] = updatedLoan;
        this.loanDetailsSubject.next([...current]);
      }
      
      deleteLoanDetail(index: number) {
        const current = this.loanDetailsSubject.value;
        current.splice(index, 1);
        this.loanDetailsSubject.next([...current]);
      }
      
}