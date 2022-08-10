import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsPackageModule } from "./bs-package.module";
import { CustomTableComponent } from "./components/custom-table/custom-table.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";


const sharedComponent = [
    PageHeaderComponent,
    CustomTableComponent,
    LoaderComponent
]

const sharedModules = [
    FormsModule,
    ReactiveFormsModule,
    BsPackageModule
]

@NgModule({
    declarations: [
        ...sharedComponent
    ],

    imports: [
        CommonModule,
        ...sharedModules,
    ],

    exports: [
        ...sharedComponent,
        ...sharedModules
    ],

    providers: [
        DatePipe
    ]
})

export class SharedModule {  }