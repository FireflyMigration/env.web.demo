import { Component, OnInit } from '@angular/core';
import { Categories } from '../models';
import { GridSettings } from 'radweb';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor() { }
  categories = new GridSettings<Categories>(new Categories(),
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
  