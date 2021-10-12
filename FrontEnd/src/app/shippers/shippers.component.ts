import { Component, OnInit } from '@angular/core';
import { Shippers } from './shippers';
import {  Remult } from 'remult';
import { GridSettings } from '@remult/angular';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent implements OnInit {

  constructor(private remult:Remult) { }
  shippers = new GridSettings(this.remult.repo(Shippers),
  {
    allowUpdate:true,
    allowInsert:true,
    
    columnSettings: shippers =>
    [
      {
        field:shippers.id,
        width:'100px'
      },
      shippers.companyName
    ]
  });
  ngOnInit() {
  }

}
