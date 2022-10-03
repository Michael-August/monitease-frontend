import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SWEET_ALERT } from 'src/app/shared/utils';
import { ISales } from '../sales.model';

@Component({
  selector: 'app-filterable-account',
  templateUrl: './filterable-account.component.html',
  styleUrls: ['./filterable-account.component.css']
})
export class FilterableAccountComponent implements OnInit {

  constructor(public utils: UtilsService, private allSrv: OthersService, private router: Router) { }

  title = 'General Account'
  hideForm = true

  filterAccount = new FormGroup({
    startDateSold: new FormControl(''),
    endDateSold: new FormControl('')
  })

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
  datasource: Array<any> = []
  totals: any = {}

  ngOnInit(): void {
    this.getAccount()
  }

  search(event: any) {

  }

  expandForm() {
    this.hideForm = !this.hideForm
  }

  filtered() {
    this.utils.isLoading = true
    this.allSrv.getFilteredAccount(this.filterAccount.value).subscribe((res: any) => {
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

  getAccount() {
    this.utils.isLoading = true
    this.allSrv.getAllAccount().subscribe((res: any) => {
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
