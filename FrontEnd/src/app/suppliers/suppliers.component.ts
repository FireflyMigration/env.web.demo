import { Component, OnInit } from '@angular/core';
import { Suppliers } from '../models';
import { GridSettings, Column, Context } from '@remult/core';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  
  constructor(private context:Context) { }
  suppliers =this.context.for(Suppliers) .gridSettings(
  {
    get: {
      limit: 25
    },
    allowUpdate:true,
    allowInsert:true,
    hideDataArea: true,
    columnSettings: suppliers =>
    [
      {
        column:suppliers.id,
        width:'100px'
      },
      suppliers.companyName
    ]
  });
  ngOnInit() {
  }
}
