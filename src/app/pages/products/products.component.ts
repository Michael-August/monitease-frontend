import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OthersService } from 'src/app/shared/services/others/others.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { utilVariables } from 'src/app/shared/utils';
import { IProduct } from './products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private allSrv: OthersService, public utils: UtilsService) { }

  title: string = 'Products'

  form = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl(''),
    restock: new FormControl('')
  })

  tableColumns = [
    { key: 'item_name', value: 'Name' },
    { key: 'quantity', value: 'Quantity' },
    { key: 'restocklevel', value: 'Restock Level' },
    { key: 'dateadded', value: 'Date created' }
  ]

  datasource: Array<IProduct[]> = []

  get name() {
    return this.form.controls['name']
  }

  get quantity() {
    return this.form.controls['quantity']
  }

  get restock() {
    return this.form.controls['restock']
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    // this.isLoading = true
    this.allSrv.getProducts().subscribe(res => {
      this.datasource = res
    }).add(() => this.utils.isLoading = false)
  }

  submit(payload: any) {
    this.allSrv.postProduct(payload).subscribe(res => {
      console.log(res);
    })
  }

}
