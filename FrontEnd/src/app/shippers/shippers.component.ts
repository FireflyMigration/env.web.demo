import { Component, OnInit } from '@angular/core';
import { Shippers } from '../models';
import { GridSettings, Context } from '@remult/core';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent implements OnInit {

  constructor(private context:Context) { }
  shippers = this.context.for(Shippers).gridSettings(
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
