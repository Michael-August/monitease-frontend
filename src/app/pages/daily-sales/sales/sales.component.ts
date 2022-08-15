import { Component, OnInit } from '@angular/core';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(public utils: UtilsService, private allSrv: OthersService) { }

  title: string = 'Sales'
  view: boolean = true

  tableColumns = [
    { key: 'customername', value: 'Customer' },
    { key: 'quantity', value: 'Quantity' },
    { key: 'rate', value: 'Rate' },
    { key: 'totalprice', value: 'Total Price' },
    { key: 'itemsold', value: 'Item Sold' },
    { key: 'havepaid', value: 'Have Paid' },
    { key: 'datesold', value: 'Date Sold' }
  ]

  datasource = []

  ngOnInit(): void {
    this.getSales()
  }

  getSales() {
    this.utils.isLoading = true
    this.allSrv.getSales().subscribe((res: any) => {
      console.log(res)
      this.utils.numberOfSales = res.results.length
    }).add(() => this.utils.isLoading = false)
  }

  tableAction(event: any, modal: any) {

  }

}
