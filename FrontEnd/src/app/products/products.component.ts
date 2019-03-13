import { Component, OnInit } from '@angular/core';
import { GridSettings } from 'radweb';
import { Products } from '../models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }
  products = new GridSettings(new Products(), {
    hideDataArea: true
  });
  ngOnInit() {
  }

}
