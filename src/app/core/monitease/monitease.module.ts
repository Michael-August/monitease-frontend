import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MonitEaseRoutingModule } from './monitease-routing.module';

import { MonitEaseComponent } from './monitease.component';
import { TopNavComponent } from 'src/app/layout/top-nav/top-nav.component';
import { SideNavComponent } from 'src/app/layout/side-nav/side-nav.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { EmployeesComponent } from 'src/app/pages/employees/employees.component';


@NgModule({
  declarations: [
    MonitEaseComponent,
    TopNavComponent,
    SideNavComponent,
    DashboardComponent,
    ProductsComponent,
    EmployeesComponent,
  ],
  imports: [
    CommonModule,
    MonitEaseRoutingModule,
    SharedModule
  ]
})
export class MoniteaseModule { }
