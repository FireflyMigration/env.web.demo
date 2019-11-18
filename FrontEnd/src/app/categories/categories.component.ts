import { Component, OnInit } from '@angular/core';
import { Categories } from '../models';
import { GridSettings, Context } from '@remult/core';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private context:Context) { }
  categories = this.context.for(Categories).gridSettings(
   {
    
     allowUpdate:true,
     allowInsert:true,
     hideDataArea: true,
     columnSettings: categories =>
     [
       {
         column:categories.id,
         width:'100px'
       },
       categories.categoryName
      ]
    });
    ngOnInit() {
    }
  
  }
  