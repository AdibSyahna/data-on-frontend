import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-guest',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './add-guest.html',
  styleUrl: './add-guest.scss',
})
export class AddGuest {
  public activeModal = inject(NgbActiveModal);
  public firstName = new FormControl('', [Validators.required]);
  public lastName = new FormControl('', [Validators.required]);
  public phoneNumber = new FormControl('', [Validators.required]);
  public idCardNo = new FormControl('', [Validators.required]);
  public visitPurpose = new FormControl('', []);

  public register() {
    if (this.firstName.invalid || this.lastName.invalid || this.phoneNumber.invalid || this.idCardNo.invalid) return;
    const newGuest = {
      first_name: this.firstName.value!,
      last_name: this.lastName.value!,
      phone_number: this.phoneNumber.value!,
      id_card_no: this.idCardNo.value!,
      visit_purpose: this.visitPurpose.value || "",
    }
    this.activeModal.close(newGuest);
  }

}
