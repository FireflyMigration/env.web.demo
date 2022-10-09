import { Component, OnInit } from '@angular/core';
import { Suppliers } from './suppliers';
import { remult } from 'remult';
import { GridSettings } from 'common-ui-elements/interfaces';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  constructor() { }
  suppliers = new GridSettings(remult.repo(Suppliers),
    {
      rowsInPage: 25,
      allowUpdate: true,
      allowInsert: true,

      columnSettings: suppliers =>
        [
          {
            field: suppliers.id,
            width: '100px'
          },
          suppliers.companyName
        ]
    });
  ngOnInit() {
  }
}
