import { Component, OnInit } from '@angular/core';


import { DialogService } from '../dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private dialog: DialogService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<SignInComponent>,
    private http: HttpClient) { }
  user!: string;
  password!: string;
  ngOnInit() {
  }
  async signIn() {
    if (this.canceling)
      return;
    let token: string;
    if (!this.user || this.user.length < 2 || !(token = (await this.doSignIn(this.user, this.password)))) {
      this.dialog.yesNoQuestion("Invalid sign in information");
    }
    else {
      this.auth.setAuthToken(token);
      this.dialogRef.close();
    }
  }
  canceling = false;
  cancel() {
    this.canceling = true;
    this.dialogRef.close();
  }
  async doSignIn(username: string, password: string) {
    return await this.http.post<any>('/home/login', { username, password }).toPromise();
  }

}
