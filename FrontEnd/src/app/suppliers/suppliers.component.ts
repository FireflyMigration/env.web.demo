import { Component, OnInit } from '@angular/core';
import { Suppliers } from '../models';
import { Context } from '@remult/core';
import { GridSettings } from '@remult/angular';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  constructor(private context: Context) { }
  suppliers = new GridSettings(this.context.for(Suppliers),
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
