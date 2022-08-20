import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DailyAccountComponent } from "./daily-account/daily-account.component";
import { SalesComponent } from "./sales/sales.component";

const dailySalesRoutes: Routes = [
    { path: 'sales', component: SalesComponent },
    { path: 'daily-account', component: DailyAccountComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(dailySalesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DailySalesRouteModule { }
