import { Component, OnInit } from '@angular/core';
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

  constructor(private activatedRoute: ActivatedRoute, private utils: UtilsService, private allSrv: OthersService) { }

  product: IProduct = {
    id: 0,
    item_name: '',
    quantity: 0,
    restocklevel: 0
  }

  ngOnInit(): void {
    let productId: number = +this.activatedRoute.snapshot.params['id']
    this.getProduct(productId)
  }

  getProduct(id: number) {
    this.utils.isLoading = true
    this.allSrv.getProductsbyId(id).subscribe((res: any) => {
      this.product = res.data
    }).add(() => {
      this.utils.isLoading = false
    })
  }

}
