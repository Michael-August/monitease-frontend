import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "src/app/pages/dashboard/dashboard.component";
import { MonitEaseComponent } from "./monitease.component";

const moniteaseValidRoute: Routes = [
    {
        path: '',
        component: MonitEaseComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'dailysales', loadChildren: () => import('../../pages/daily-sales/daily-sales.module').then(mod => mod.DailySalesModule) }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(moniteaseValidRoute)
    ],
    exports: [
        RouterModule
    ]
})
export class MonitEaseRoutingModule { }
