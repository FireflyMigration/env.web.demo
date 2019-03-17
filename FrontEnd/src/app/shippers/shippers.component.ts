import { Component, OnInit } from '@angular/core';
import { Shippers } from '../models';
import { GridSettings } from 'radweb';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent implements OnInit {

  constructor() { }
  shippers = new GridSettings<Shippers>(new Shippers(), 
  {
    allowUpdate:true,
    allowInsert:true,
    hideDataArea: true,
    columnSettings: shippers =>
    [
      {
        column:shippers.id,
        width:'100px'
      },
      shippers.companyName
    ]
  });
  ngOnInit() {
  }

}
