import { Component, OnInit } from '@angular/core';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ISales } from '../sales.model';

@Component({
  selector: 'app-daily-account',
  templateUrl: './daily-account.component.html',
  styleUrls: ['./daily-account.component.css']
})
export class DailyAccountComponent implements OnInit {

  constructor(public utils: UtilsService, private allSrv: OthersService) { }

  title = 'Daily Account'
  
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
  totals: any = {}

  ngOnInit(): void {
    this.getDailyAccount()
  }

  search(event: any) {

  }

  getDailyAccount() {
    this.utils.isLoading = true
    this.allSrv.getDailyAccount().subscribe((res: any) => {
      this.datasource = res.data
      this.totals = res
    }).add(() => this.utils.isLoading = false)
  }

}
