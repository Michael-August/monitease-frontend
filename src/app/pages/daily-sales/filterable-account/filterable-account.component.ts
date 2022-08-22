import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ISales } from '../sales.model';

@Component({
  selector: 'app-filterable-account',
  templateUrl: './filterable-account.component.html',
  styleUrls: ['./filterable-account.component.css']
})
export class FilterableAccountComponent implements OnInit {

  constructor(public utils: UtilsService, private allSrv: OthersService) { }

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
    }).add(() => this.utils.isLoading = false)
  }

  getAccount() {
    this.utils.isLoading = true
    this.allSrv.getAllAccount().subscribe((res: any) => {
      this.datasource = res.data
      this.totals = res
    }).add(() => this.utils.isLoading = false)
  }

}
