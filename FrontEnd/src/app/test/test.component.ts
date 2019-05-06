import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(public authService: AuthService) {

  }
  async  testLogin() {
    await this.authService.login("noam", "asdf",true);
  }

  ngOnInit() {
  }

}
