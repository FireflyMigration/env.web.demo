import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { order } from './order';

@Component({
  selector: 'app-aviv',
  templateUrl: './aviv.component.html',
  styleUrls: ['./aviv.component.scss'],
})
export class AvivComponent implements OnInit {
  constructor(private http: HttpClient) {}

  orders = this.http.get<order[]>(
    '/dataapi/orders?' + new URLSearchParams({ _sort: 'customerID' }).toString()
  );

  async save(order: order) {
    try {
      await firstValueFrom(this.http.put('/dataapi/orders/' + order.id, order));
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  }

  ngOnInit(): void {}
}
