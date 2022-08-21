import { Component, OnInit } from '@angular/core';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ISales } from '../sales.model';

@Component({
  selector: 'app-monthly-account',
  templateUrl: './monthly-account.component.html',
  styleUrls: ['./monthly-account.component.css']
})
export class MonthlyAccountComponent implements OnInit {

  constructor(public utils: UtilsService, private allSrv: OthersService) { }

  title = 'Monthly Account'

  tableColumns = [
    { key: 'customername', value: 'Customer' },
    { key: 'quantity', value: 'Quantity' },
    { key: 'rate', value: 'Rate' },
    { key: 'totalprice', value: 'Total Price' },
    { key: 'itemsold', value: 'Item Sold' },
    { key: 'paymentmethod', value: 'Payement Method' },
    { key: 'havepaid', value: 'Have Paid' },
    { key: 'datesold', value: 'Date Sold' },
    { key: 'datepaid', value: 'Date Paid' }
  ]
  datasource: Array<ISales> = []

  ngOnInit(): void {
    this.getMonthlyAccount()
  }

  search(event: any) {

  }

  getMonthlyAccount() {
    this.utils.isLoading = true
    this.allSrv.getMonthlyAccount().subscribe((res: any) => {
      this.datasource = res.data
    }).add(() => this.utils.isLoading = false)
  }

}
