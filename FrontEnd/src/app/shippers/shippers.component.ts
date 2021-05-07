import { Component, OnInit } from '@angular/core';
import { Shippers } from '../models';
import {  Context } from '@remult/core';
import { GridSettings } from '@remult/angular';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent implements OnInit {

  constructor(private context:Context) { }
  shippers = new GridSettings(this.context.for(Shippers),
  {
    allowUpdate:true,
    allowInsert:true,
    
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
