import { Component, OnInit } from '@angular/core';
import { Categories } from '../models';
import { Context } from '@remult/core';
import { GridSettings } from '@remult/angular';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private context: Context) { }
  categories = new GridSettings(this.context.for(Categories),
    {

      allowUpdate: true,
      allowInsert: true,
      columnSettings: categories =>
        [
          {
            column: categories.id,
            width: '100px'
          },
          categories.categoryName
        ]
    });
  ngOnInit() {
  }

}
