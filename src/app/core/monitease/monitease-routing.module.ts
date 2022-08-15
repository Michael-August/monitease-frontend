import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "src/app/pages/dashboard/dashboard.component";
import { EmployeesComponent } from "src/app/pages/employees/employees.component";
import { ProductDetailsComponent } from "src/app/pages/product-details/product-details.component";
import { ProductsComponent } from "src/app/pages/products/products.component";
import { UsersComponent } from "src/app/pages/users/users.component";
import { MonitEaseComponent } from "./monitease.component";

const moniteaseValidRoute: Routes = [
    {
        path: '',
        component: MonitEaseComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'products/:id', component: ProductDetailsComponent },
            { path: 'employees', component: EmployeesComponent },
            { path: 'users', component: UsersComponent },
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
