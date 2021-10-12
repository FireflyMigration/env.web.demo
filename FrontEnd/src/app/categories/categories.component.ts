import { Component, OnInit } from '@angular/core';
import { Categories } from './categories';
import { Remult } from 'remult';
import { GridSettings } from '@remult/angular';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private remult: Remult) { }
  categories = new GridSettings(this.remult.repo(Categories),
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
