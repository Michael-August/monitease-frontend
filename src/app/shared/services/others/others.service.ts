import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUsers } from 'src/app/pages/users/users.model';

@Injectable({
  providedIn: 'root'
})
export class OthersService {

  base_url = BASE_URL
  product$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient) { 
  }

  // Products
  // products() {
  //   this.http.get(`${this.base_url}/Products`).subscribe((data: any) => {
  //     this.product$.next(data)
  //   })
  // }

  getProducts() {
    return this.http.get(`${this.base_url}/Products`)
  }

  // getProducts(): Observable<any> {
  //   return this.product$.asObservable()
  // }

  getProductsbyId(id: number) {
    return this.http.get(`${this.base_url}/Products/${id}`)
  }

  postProduct(payload: any) {
    return this.http.post(`${this.base_url}/Products/`, payload)
  }

  updateProduct(payload: any, id: number) {
    return this.http.put(`${this.base_url}/Products/${id}`, payload)
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.base_url}/Products/${id}`)
  }

  // Users
  register(payload: IUsers) {
    return this.http.post(`${this.base_url}/Authentication/register`, payload)
  }

  // Sales
  getSales() {
    return this.http.get(`${this.base_url}/DailySales`)
  }
  
}
