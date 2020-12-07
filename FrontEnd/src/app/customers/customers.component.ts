import { Component, OnInit } from '@angular/core';
import { GridSettings, Context } from '@remult/core';
import { Customers } from '../models';
import * as chart from 'chart.js';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private context:Context) { }

  async ngOnInit() {
    await this.customers.getRecords();
    this.updateChart();
  }
  customers = this.context.for(Customers).gridSettings( {
    
    allowUpdate: true,
    get: {
      orderBy: f => [f.companyName],
      limit: 1000
    }
  });
  
  searchString: string;
  selectCustomer(c: Customers) {
    this.customers.setCurrentRow(c);
  }
  showCustomer(c: Customers) {
    return (!this.searchString || c.companyName.value.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0)&&(!this.filterCountry||c.country.value==this.filterCountry);
  }
  dataArea = this.customers.addArea({
    numberOfColumnAreas: 2,
    columnSettings: f => [
      f.id,
      f.companyName,
      f.contactName,
      f.contactTitle,
      f.address,
      f.city,
      f.region,
      f.postalCode,
      f.country,
      f.phone,
      f.fax

    ]
  });


  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public colors: Array<any> = [
    {
      backgroundColor: []

    }];
  public pieChartType: string = 'pie';

  options: chart.ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'right',
      display: false,
      onClick: (event: MouseEvent, legendItem: any) => {


        return false;
      }
    },
  };
  filterCountry: string;
  public chartClicked(e: any): void {
    if (e.active && e.active.length > 0) {
      this.filterCountry = this.countriesList[e.active[0]._index]

    }
  }
  countriesList = [];
  updateChart() {
    this.pieChartData = [];
    this.pieChartLabels.splice(0);
    this.colors[0].backgroundColor.splice(0);
    let countries = {};
    this.countriesList = [];
    this.customers.items.forEach(c => {
      let x = countries[c.country.value];
      if (!x) {
        x = 0;
        this.countriesList.push(c.country.value);
      }
      countries[c.country.value] = x + 1;
    });
    this.countriesList.sort((a, b) => {
      var ca = countries[a];
      var cb = countries[b];
      if (ca < cb)
        return 1
      if (ca > cb)
        return -1;
      return 0;

    });






    let col = [colors.yellow, colors.orange, colors.blue, colors.green, colors.red];
    let i = 0;
    this.countriesList.forEach(c => {
      this.pieChartLabels.push(c + ' ' + countries[c]);
      this.pieChartData.push(countries[c]);
      this.colors[0].backgroundColor.push(col[i++ % col.length]);

    });
  }




}


export const colors = {
  yellow: '#FDE098'//yello
  , orange: '#FAC090'//orange
  , blue: '#84C5F1'//blue
  , green: '#91D7D7'//green
  , red: '#FD9FB3'//red
  , gray: 'gray'
};