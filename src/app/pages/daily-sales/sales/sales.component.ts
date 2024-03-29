import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType, NotificationService } from 'src/app/shared/services/notification.service';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SWEET_ALERT } from 'src/app/shared/utils';
import { IProduct } from '../../products/products.model';
import { ISales } from '../sales.model';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(public utils: UtilsService, private allSrv: OthersService, private router: Router, private alertService: NotificationService) { }

  title: string = 'Sales'
  view: boolean = true
  isNew: boolean = true
  hideForm = true
  page = 1
  response: any

  paidData: any = {}

  tableColumns = [
    { key: 'customername', value: 'Customer' },
    { key: 'quantity', value: 'Quantity' },
    { key: 'rate', value: 'Rate' },
    { key: 'totalprice', value: 'Total Price' },
    { key: 'itemsold', value: 'Item Sold' },
    { key: 'havepaid', value: 'Have Paid' },
    { key: 'datesold', value: 'Date Sold' },
    { key: 'dateupdated', value: 'Date Updated' },
    { key: 'datepaid', value: 'Date Paid' }
  ]

  filterForm = new FormGroup({
    customername: new FormControl(''),
    itemsold: new FormControl(''),
    startDateSold: new FormControl(''),
    endDateSold: new FormControl(''),
    startDatePaid: new FormControl(''),
    endDatePaid: new FormControl(''),
    havePaid: new FormControl('')
  })

  paidForm = new FormGroup({
    paymentmethod: new FormControl('', Validators.required)
  })

  get paidpaymentmethod() {
    return this.paidForm.controls['paymentmethod']
  }

  form = new FormGroup({
    customername: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    havepaid: new FormControl(''),
    itemsold: new FormControl('', [Validators.required]),
    paymentmethod: new FormControl('')
  })

  get customername() {
    return this.form.controls['customername']
  }

  get quantity() {
    return this.form.controls['quantity']
  }

  get rate() {
    return this.form.controls['rate']
  }

  get itemsold() {
    return this.form.controls['itemsold']
  }

  get havepaid() {
    return this.form.controls['havepaid']
  }

  get paymentmethod() {
    return this.form.controls['paymentmethod']
  }

  datasource = []
  products: Array<IProduct> = []

  ngOnInit(): void {
    this.getSales()
    this.getProducts()
  }

  expandForm() {
    this.hideForm = !this.hideForm
  }

  changeItemsold(event: any) {
    this.itemsold.setValue(event.target.value, {
      onlySelf: true,
    })
  }

  changePaymentMethod(event: any) {
    this.paymentmethod.setValue(event.target.value)
  }

  changepaidpaymentmethod(event: any) {
    this.paidpaymentmethod.setValue(event.target.value)
  }

  pageChanged(event: any) {
    this.page = event
    this.getSales()
  }

  getProducts() {
    this.allSrv.getProducts().subscribe((res: any) => {
      this.products = res
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    })
  }

  getSales() {
    this.utils.isLoading = true
    this.allSrv.getSales(this.page).subscribe((res: any) => {
      this.datasource = res.results
      this.response = res
      console.log(this.response)
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

  filter() {
    this.utils.isLoading = true
    const payload = this.filterForm.value
    this.allSrv.getFilteredSales(payload).subscribe((res: any) => {
      this.datasource = res.results
      this.filterForm.reset()
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

  search(event: any) {
    this.utils.isLoading = true
    this.allSrv.getSales(this.page, event).subscribe((res: any) => {
      this.datasource = res.results
      this.response = res
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

  changepaid() {
    this.utils.isLoading = true
    this.paidData.paymentmethod = this.paidpaymentmethod.value
    console.log(this.paidData)
    this.allSrv.updateHavepaid(this.paidData, this.paidData['id']).subscribe((res: any) => {
      this.utils.modalRef.hide()
      this.getSales()
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

  togglePaid(data: ISales, modal: any) {
    if(data['havepaid'] === false) {
      this.utils.triggerModal(modal, ['modal-dialogue', 'modal-dialog-centered'])
      this.paidData = {
        id: data.id,
        havepaid: !data.havepaid,
        datepaid: new Date().toJSON().slice(0, 10),
      }
    } else {
      this.paidData = {
        id: data.id,
        havepaid: !data.havepaid,
      }  
      this.utils.isLoading = true
      this.allSrv.updateHavepaid(this.paidData, this.paidData['id']).subscribe((res: any) => {
        this.getSales()
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

  closeModal() {
    this.form.reset()
  }

  submit() {
    this.utils.modalRef.hide()
    this.utils.isLoading = true
    const payload = this.form.value
    if (payload['paymentmethod'] == '') {
      payload['paymentmethod'] = 'cash'
    }

    if (payload['havepaid'] == '') {
      payload['havepaid'] = false
    }

    if (this.isNew) {
      this.allSrv.postSales(payload).subscribe(res => {
        SWEET_ALERT('Successful', `Sale of ${this.form.controls['item_sold_name'].value} added successfully`, 'success', 'success', 'OK', false, undefined, undefined)
        this.form.reset()
        this.getSales()
      }, err => {
        // this.utils.modalRef.hide()
        if (err.status === 403) {
          this.router.navigate(['/dashboard'])
          SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
        } else {
          SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
        }
      }).add(() => this.utils.isLoading = false)
    }

    if (!this.isNew) {
      payload['id'] = this.utils.objectId
      this.allSrv.updateSales(payload, payload['id']).subscribe(res => {
        this.utils.modalRef.hide()
        SWEET_ALERT('Successful', `Sale of ${this.form.controls['item_sold_name'].value} editted successfully`, 'success', 'success', 'OK', false, undefined, undefined)
        this.form.reset()
        this.getSales()
      }, err => {
        console.log(err);
        this.utils.modalRef.hide()
        if (err.status === 403) {
          this.router.navigate(['/dashboard'])
          SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
        } else {
          SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
        }
      }).add(() => {
        this.utils.isLoading = false
        this.utils.objectId = 0
      })
    }
  }

  private process_delete(id: number) {
    this.utils.isLoading = true
    this.allSrv.deleteSales(id).subscribe(res => {
      SWEET_ALERT('Successful', `Sale deleted successfully`, 'success', 'success', 'OK', false, undefined, undefined)
      this.getSales()
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

  tableAction(event: any, data: ISales) {
    switch (event) {
      case 'EDIT':
        this.utils.objectId = data.id
        console.log(this.utils.objectId);
        this.form.patchValue(data)
        // this.utils.triggerModal(modal, ['modal-md', 'modal-dialogue-centered'])
        this.isNew = false
        break;
      case 'DELETE':
        (this.alertService.popUpAlert('Deleting', `Are you sure you want to Delete sale of ${data.item_sold_name} to ${data.customername}?`,
          AlertType.Confirm, true) as Promise<any>).then((arg) => {
            if (arg.value) {
              this.process_delete(data.id);
            }
          });
        break;
    }
  }

}
