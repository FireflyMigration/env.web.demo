import { Component, OnInit } from '@angular/core';
import { SelectService } from '../select-popup/select-popup.component';
import { AuthService } from '../auth/auth-service';
import { DialogService } from '../dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private dialog: DialogService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignInComponent>) { }
  user: string;
  password: string;
  ngOnInit() {
  }
  async signIn() {
    if (this.canceling)
      return;
    if (!this.user || this.user.length < 2 || !(await this.authService.signIn(this.user, this.password))) {
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

}
