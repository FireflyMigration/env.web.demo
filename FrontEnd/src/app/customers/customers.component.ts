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
    this.customers.getRecords();
  }
  customers = new GridSettings(new Customers(), {
    hideDataArea: true,
    allowUpdate: true,
    get: {
      orderBy: f => [f.companyName],
      limit: 1000
    }
  });
  searchString: string;
  selectCustomer(c: Customers) {
    this.customers.setCurrentRow(c);
  }
  showCustomer(c: Customers) {
    return !this.searchString || c.companyName.value.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0;
  }
  dataArea = this.customers.addArea({
    numberOfColumnAreas: 2,
    columnSettings: f => [
      f.id,
      f.companyName,
      f.contactName,
      f.contactTitle,
      f.address,
      f.city,
      f.region,
      f.postalCode,
      f.country,
      f.phone,
      f.fax

    ]
  });
}
