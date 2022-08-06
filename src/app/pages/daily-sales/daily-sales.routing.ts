import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalesComponent } from "./sales/sales.component";

const dailySalesRoutes: Routes = [
    { path: 'sales', component: SalesComponent }
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
