import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DailyAccountComponent } from "./daily-account/daily-account.component";
import { FilterableAccountComponent } from "./filterable-account/filterable-account.component";
import { MonthlyAccountComponent } from "./monthly-account/monthly-account.component";
import { SalesComponent } from "./sales/sales.component";
import { WeeklyAccountComponent } from "./weekly-account/weekly-account.component";

const dailySalesRoutes: Routes = [
    { path: 'sales', component: SalesComponent },
    { path: 'daily-account', component: DailyAccountComponent },
    { path: 'weekly-account', component: WeeklyAccountComponent },
    { path: 'monthly-account', component: MonthlyAccountComponent },
    { path: 'filtered-account', component: FilterableAccountComponent },
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
