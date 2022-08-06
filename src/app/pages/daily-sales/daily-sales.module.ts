import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales/sales.component';
import { DailySalesRouteModule } from './daily-sales.routing';



@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    DailySalesRouteModule
  ]
})
export class DailySalesModule { }
