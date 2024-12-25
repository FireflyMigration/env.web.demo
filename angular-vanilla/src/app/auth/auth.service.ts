import { inject, Injectable } from '@angular/core';
import { UIService } from '../lib/ui.service';
import { postApi } from '../lib/data-api-for';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  ui = inject(UIService);
  currentUser: UserInfo | null = null;
  async loadCurrentUser() {
    this.currentUser = await postApi('auth/me');
  }
  async signIn() {
    this.ui.formDialog({
      fieldsConfig: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      onSubmit: async (signInInfo) => {
        this.currentUser = await postApi('auth/login', signInInfo);
        console.log(this.currentUser);
      },
      title: 'Sign In',
    });
  }
  async signOut() {
    await postApi('auth/logout', {});
    this.currentUser = null;
  }
}
export interface UserInfo {
  id: string;
  name: string;
  roles: string[];
}
