import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, Observable, retry, startWith, switchMap, tap } from 'rxjs';
import { AlertType, NotificationService } from 'src/app/shared/services/notification.service';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SWEET_ALERT } from 'src/app/shared/utils';
import { IProduct } from './products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private allSrv: OthersService, public utils: UtilsService, private alertService: NotificationService, private router: Router) { }

  title: string = 'Products'
  isNew: boolean = true
  view: boolean = false

  total_added: any 

  form = new FormGroup({
    item_name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    restocklevel: new FormControl('', [Validators.required])
  })

  tableColumns = [
    { key: 'item_name', value: 'Name' },
    { key: 'quantity', value: 'Quantity' },
    { key: 'restocklevel', value: 'Restock Level' },
    { key: 'total_added', value: 'Total Added' },
    { key: 'dateadded', value: 'Date created' }
  ]

  datasource: Observable<any> | undefined

  get name() {
    return this.form.controls['item_name']
  }

  get quantity() {
    return this.form.controls['quantity']
  }

  get restock() {
    return this.form.controls['restocklevel']
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.utils.isLoading = true
    this.datasource = this.allSrv.getProducts().pipe(
      tap(() => this.utils.isLoading = false)
    )
  }

  closeModal() {
    this.form.reset()
  }

  search(event: FormControl) {
    console.log(event)
    this.datasource = this.allSrv.getProducts(event.value)
  }

  submit() {
    this.utils.isLoading = true
    const payload: IProduct = this.form.value
    if (this.isNew) {
      payload['total_added'] = this.quantity.value
      this.allSrv.postProduct(payload).subscribe((res: any) => {
        console.log(res);
        this.utils.modalRef.hide()
        if (res.message == "Product already exist") {
          SWEET_ALERT('Error', `${res.message}`, 'error', 'error', 'OK', false, undefined, undefined)
        } else {
          SWEET_ALERT('Successful', `Product ${this.name.value} added successfully`, 'success', 'success', 'OK', false, undefined, undefined)
        }
        this.form.reset()
        this.getProducts()
      }, err => {
        this.utils.modalRef.hide()
        if (err.status === 403) {
          this.router.navigate(['/dashboard'])
          SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
        } else {
          SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
        }
      }).add(() => this.utils.isLoading = false)
      return;
    }

    if (!this.isNew) {
      payload['id'] = this.utils.objectId
      payload['total_added'] = this.total_added
      this.allSrv.updateProduct(payload, payload['id']).subscribe(res => {
        console.log(res);
        this.utils.modalRef.hide()
        SWEET_ALERT('Successful', `Product ${this.name.value} Updated successfully`, 'success', 'success', 'OK', false, undefined, undefined)
        this.form.reset()
        this.getProducts()
      }, err => {
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
      return;
    }

  }

  private process_delete(id: number) {
    this.utils.isLoading = true
    this.allSrv.deleteProduct(id).subscribe(res => {
      SWEET_ALERT('Successful', `Product deleted successfully`, 'success', 'success', 'OK', false, undefined, undefined)
      this.getProducts()
      console.log('Done')
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

  tableAction(event: { action: string, type: string, data: IProduct }, modal: TemplateRef<any>) {
    switch (event.action) {
      case 'EDIT':
        this.utils.triggerModal(modal, ['modal-md, modal-dialog-centered'])
        this.form.patchValue(event.data)
        this.total_added = event.data.total_added
        this.utils.objectId = event.data.id
        this.isNew = false
        break;
      case 'DELETE':
        (this.alertService.popUpAlert('', `Are you sure you want to Delete ${event.data.item_name}?`,
          AlertType.Confirm, true) as Promise<any>).then((arg) => {
            if (arg.value) {
              this.process_delete(event.data.id);
            }
          });
        break
      case 'VIEW':
        this.router.navigate([`/products/${event.data.id}`])
        break;
    }
  }

}
