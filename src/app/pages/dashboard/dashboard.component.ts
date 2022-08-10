import { Component, OnInit } from '@angular/core';
import { OthersService } from 'src/app/shared/services/others/others.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private otherSrv: OthersService) { }

  noOfProducts: number | undefined

  ngOnInit(): void {
    this.otherSrv.product$.subscribe(res => this.noOfProducts = res.length)
  }
  

}
