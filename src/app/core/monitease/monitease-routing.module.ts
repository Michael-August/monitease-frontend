import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MonitEaseComponent } from "./monitease.component";

const moniteaseValidRoute: Routes = [
    {
        path: '',
        component: MonitEaseComponent,
        children: [
            
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
