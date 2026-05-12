import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

declare let md5: (value: any) => string;

@Injectable({
  providedIn: 'root',
})
export class Auth {
  public logged_in: boolean = false;
  public constructor(private http: HttpClient) { 
    if(localStorage.getItem("auth")) {
      this.logged_in = true;
    }
  }

  public server_host() { return `${window.location.protocol}//${window.location.hostname}:80` }

  public async login(username: string, password: string) {
    return new Promise<void>(async (resolve, reject) => {
      await lastValueFrom(this.http.post(this.server_host() + "/user/login", {
        email: username,
        password: md5(password),
      }))
        .then((res: any): any => {
          console.log(res);

          if (res.data && res.data.token) {
            localStorage.setItem("auth", res.data.token)
            this.logged_in = true;
            resolve();
          }
        })
        .catch(e => {
          console.error("Login Failed", JSON.stringify(e));
          reject(e);
        })
    });
  }
}
