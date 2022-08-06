import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitEaseComponent } from './monitease.component';
import { TopNavComponent } from 'src/app/layout/top-nav/top-nav.component';
import { SideNavComponent } from 'src/app/layout/side-nav/side-nav.component';
import { MonitEaseRoutingModule } from './monitease-routing.module';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    MonitEaseComponent,
    TopNavComponent,
    SideNavComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MonitEaseRoutingModule
  ]
})
export class MoniteaseModule { }
