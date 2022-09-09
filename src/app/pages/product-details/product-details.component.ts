import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { IProduct } from '../products/products.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public utils: UtilsService, private allSrv: OthersService) { }

  product: IProduct = {
    id: 0,
    item_name: '',
    quantity: 0,
    restocklevel: 0,
    percent: 0,
    total_added: 0
  }

  title?: any;

  ngOnInit(): void {
    let productId: number = +this.activatedRoute.snapshot.params['id']
    this.getProduct(productId)
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
    this.allSrv
  }

}
