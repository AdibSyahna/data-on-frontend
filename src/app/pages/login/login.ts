import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { Layout } from '../../services/layout/layout';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatTooltipModule, MatRippleModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public password = new FormControl('', [Validators.required]);
  public username = new FormControl('', [Validators.required]);

  public readonly requirement_login = {
    username: "Your account's username",
    password: "Your account's password"
  }

  public constructor(public auth: Auth, public layout: Layout) { }

  public async login() {
    if (this.password.invalid || this.username.invalid) return;
    this.layout.toggleOverlay(true, "Logging in...");

    try {
      await this.auth.login(this.username.value!, this.password.value!);
      this.layout.toggleOverlay(false);
    } catch (error) {
      console.log(error);
      
      this.layout.toggleOverlay(false);
      alert("Login gagal! Silahan periksa kembali username dan password Anda.");
    }
  }

  public errPasswordMsg() {
    return this.password.hasError('required') ? "Password cannot be blank!" : "";
  }

  public errUsernameMsg() {
    return this.username.hasError('required') ? 'Username cannot be blank!' : "";
  }
}
