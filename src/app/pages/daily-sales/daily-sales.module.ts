import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales/sales.component';
import { DailySalesRouteModule } from './daily-sales.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DailyAccountComponent } from './daily-account/daily-account.component';
import { WeeklyAccountComponent } from './weekly-account/weekly-account.component';
import { MonthlyAccountComponent } from './monthly-account/monthly-account.component';
import { FilterableAccountComponent } from './filterable-account/filterable-account.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    SalesComponent,
    DailyAccountComponent,
    WeeklyAccountComponent,
    MonthlyAccountComponent,
    FilterableAccountComponent
  ],
  imports: [
    CommonModule,
    DailySalesRouteModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class DailySalesModule { }
