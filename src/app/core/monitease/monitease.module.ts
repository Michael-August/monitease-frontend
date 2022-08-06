import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitEaseComponent } from './monitease.component';
import { TopNavComponent } from 'src/app/layout/top-nav/top-nav.component';
import { SideNavComponent } from 'src/app/layout/side-nav/side-nav.component';
import { MonitEaseRoutingModule } from './monitease-routing.module';

@NgModule({
  declarations: [
    MonitEaseComponent,
    TopNavComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    MonitEaseRoutingModule
  ]
})
export class MoniteaseModule { }
