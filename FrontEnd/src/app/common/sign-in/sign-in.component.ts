import { Component, OnInit } from '@angular/core';


import { DialogService } from '../dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtSessionManager } from '@remult/core';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private dialog: DialogService,
    private authService: JwtSessionManager,
    public dialogRef: MatDialogRef<SignInComponent>,
    private http:HttpClient) { }
  user: string;
  password: string;
  ngOnInit() {
  }
  async signIn() {
    if (this.canceling)
      return;
    if (!this.user || this.user.length < 2 || !(this.authService.setToken(await this.doSignIn(this.user, this.password)))) {
      this.dialog.YesNoQuestion("Invalid sign in information");
    }
    else
      this.dialogRef.close();
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
