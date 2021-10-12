import { Component, OnInit } from '@angular/core';
import { Suppliers } from './suppliers';
import { Remult } from 'remult';
import { GridSettings } from '@remult/angular';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  constructor(private remult: Remult) { }
  suppliers = new GridSettings(this.remult.repo(Suppliers),
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
