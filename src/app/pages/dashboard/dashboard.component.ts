import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { IProduct } from '../products/products.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private allSrv: OthersService, private router: Router) { }

  noOfProducts: number | undefined
  noOfSales: number | undefined
  products: Array<IProduct> = []
  default: Number = 50

  ngOnInit(): void {
    this.allSrv.getProducts().subscribe((res: any) => {
      this.noOfProducts = res.length
      this.products = res
    })

    this.allSrv.getSales().subscribe((res: any) => {
      this.noOfSales = res.results.length
    })
  }
  
  allproducts() {
    this.router.navigate(['/products'])
  }

}
