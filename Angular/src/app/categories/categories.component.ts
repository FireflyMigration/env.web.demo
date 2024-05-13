import { Component, OnInit } from '@angular/core';
import { Categories } from './categories';
import { remult } from 'remult';
import { GridSettings } from 'common-ui-elements/interfaces';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor() { }
  categories = new GridSettings(remult.repo(Categories),
    {

      allowUpdate: true,
      allowInsert: true,
      columnSettings: categories =>
        [
          {
            field: categories.id,
            width: '100px'
          },
          categories.categoryName
        ]
    });
  ngOnInit() {
  }

}
