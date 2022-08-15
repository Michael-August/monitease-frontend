import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales/sales.component';
import { DailySalesRouteModule } from './daily-sales.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    DailySalesRouteModule,
    SharedModule
  ]
})
export class DailySalesModule { }
