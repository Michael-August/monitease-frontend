import { Component, OnInit } from '@angular/core';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ISales } from '../sales.model';

@Component({
  selector: 'app-weekly-account',
  templateUrl: './weekly-account.component.html',
  styleUrls: ['./weekly-account.component.css']
})
export class WeeklyAccountComponent implements OnInit {

  constructor(public utils: UtilsService, private allSrv: OthersService) { }

  title = 'Weekly Account'
  
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
    this.getWeeklyAccount()
  }

  search(event: any) {

  }

  getWeeklyAccount() {
    this.utils.isLoading = true
    this.allSrv.getWeeklyAccount().subscribe((res: any) => {
      this.datasource = res.data
    }).add(() => this.utils.isLoading = false)
  }


}
