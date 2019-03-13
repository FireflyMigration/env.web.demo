import { Component, OnInit } from '@angular/core';
import { GridSettings } from 'radweb';
import { Customers } from '../models';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  customers = new GridSettings(new Customers(), {
    hideDataArea: true
  });
}
