import { Component, OnInit } from '@angular/core';
import { Shippers } from './shippers';
import { remult } from 'remult';
import { GridSettings } from 'common-ui-elements/interfaces';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent implements OnInit {

  constructor() { }
  shippers = new GridSettings(remult.repo(Shippers),
    {
      allowUpdate: true,
      allowInsert: true,
      rowButtons: [{
        name: 'click me',
        click: r => alert('You clicked ' + r.companyName)
      }],
      columnSettings: shippers =>
        [
          {
            field: shippers.id,
            width: '100px'
          },
          shippers.companyName
        ]
    });
  ngOnInit() {
  }

}
