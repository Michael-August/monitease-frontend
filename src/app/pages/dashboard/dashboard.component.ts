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

  noOfProducts: number = 0
  noOfSales: number = 0
  noOfSalesToday: number = 0
  products: Array<IProduct> = []
  default: Number = 50
  page = 1

  ngOnInit(): void {
    this.allSrv.getProducts().subscribe((res: any) => {
      this.noOfProducts = res.length
      this.products = res
    })

    this.allSrv.getSales(this.page).subscribe((res: any) => {
      this.noOfSales = res.count
    })

    this.allSrv.getDailyAccount().subscribe((res: any) => {
      this.noOfSales = res.data.length
    })
  }
  
  allproducts() {
    this.router.navigate(['/products'])
  }

}
