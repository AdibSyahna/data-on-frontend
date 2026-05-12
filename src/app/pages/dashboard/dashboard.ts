import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGuest } from '../../dialogs/add-guest/add-guest';
import { lastValueFrom } from 'rxjs';
import { Auth } from '../../services/auth/auth';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Guest {
  id: number,
  user_id?: number,
  first_name: string,
  last_name: string,
  phone_number: string,
  id_card_no: string,
  id_card_image?: string,
  visit_purpose?: string,
  check_in: number,
  check_out?: number,
  created_at?: number,
  updated_at?: number,
  deleted_at?: number,
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private modalService = inject(NgbModal);
  public daftarTamu = signal<Guest[]>([]);
  public searchQuery: string = "";

  public constructor(public auth: Auth, private http: HttpClient) { }

  public async ngOnInit() {
    this.refreshGuestList();
  }

  public async refreshGuestList() {
    await lastValueFrom(this.http.get(this.auth.server_host() + "/guest/all"))
      .then((res: any): any => {
        this.daftarTamu.set(res);
      })
      .catch(e => {
        console.error("Fetch Failed", JSON.stringify(e));
      })
  }

  public parseTime(timestamp: number) {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  public async checkOut(id: number, name: string) {
    confirm(`Check-out tamu "${name}"?`)
      &&
      await lastValueFrom(this.http.post(this.auth.server_host() + "/guest/checkout", { id }))
        .then((res: any): any => {
          console.log("Check-out Success", res);
          this.refreshGuestList();
        })
        .catch(e => {
          console.error("Check-out Failed", JSON.stringify(e));
        })
  }

  public openAddGuestModal() {
    const ExtensionV1ConfirmModal = this.modalService.open(AddGuest,
      {
        size: 'lg',
        animation: true,
        backdrop: 'static'
      }
    );

    ExtensionV1ConfirmModal.result.then((result) => {
      if (result) {
        const NewGuest: Guest = {
          id: 0,
          first_name: result.first_name,
          last_name: result.last_name,
          phone_number: result.phone_number,
          id_card_no: result.id_card_no,
          visit_purpose: result.visit_purpose,
          check_in: Date.now(),
        };

        lastValueFrom(this.http.post(this.auth.server_host() + "/guest/registration", NewGuest))
          .then((res: any): any => {
            console.log("Guest Registered", res);
            this.refreshGuestList();
          })
          .catch(e => {
            console.error("Registration Failed", JSON.stringify(e));
          })
      }
    });
  }

}
