import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SWEET_ALERT } from 'src/app/shared/utils';
import { IProduct } from '../products/products.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public utils: UtilsService, private allSrv: OthersService, private router: Router) { }

  product: IProduct = {
    id: 0,
    item_name: '',
    quantity: 0,
    restocklevel: 0,
    percent: 0,
    total_added: 0
  }

  title?: any;
  productId: number | undefined

  ngOnInit(): void {
    this.productId = +this.activatedRoute.snapshot.params['id']
    this.getProduct(this.productId)
  }

  form = new FormGroup({
    quantity: new FormControl('', Validators.required)
  })

  get quantity() {
    return this.form.controls['quantity']
  }

  getProduct(id: number) {
    this.utils.isLoading = true
    this.allSrv.getProductsbyId(id).subscribe((res: any) => {
      this.product = res.data
      this.title = this.product.item_name
    }).add(() => {
      this.utils.isLoading = false
    })
  }

  closeModal() {}

  submit() {
    this.utils.isLoading = true
    this.allSrv.updateProductQuantity(this.productId, this.form.value).subscribe(res => {
      this.utils.modalRef.hide()
      SWEET_ALERT('Successful', `Product ${this.title} restocked successfully`, 'success', 'success', 'OK', false, undefined, undefined)
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
