import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private utils: UtilsService, private router: Router) { }

  noOfProducts: number | undefined
  noOfSales: number | undefined

  ngOnInit(): void {
    this.noOfProducts = this.utils.numberOfProducts
    this.noOfSales = this.utils.numberOfSales
  }
  
  allproducts() {
    this.router.navigate(['/products'])
  }

}
