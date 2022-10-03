import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SWEET_ALERT } from 'src/app/shared/utils';
import { ISales } from '../sales.model';

@Component({
  selector: 'app-daily-account',
  templateUrl: './daily-account.component.html',
  styleUrls: ['./daily-account.component.css']
})
export class DailyAccountComponent implements OnInit {

  constructor(public utils: UtilsService, private allSrv: OthersService, private router: Router) { }

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
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

}
