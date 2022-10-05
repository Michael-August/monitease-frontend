import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUsers } from 'src/app/pages/users/users.model';
import { ISales } from 'src/app/pages/daily-sales/sales.model';

@Injectable({
  providedIn: 'root'
})
export class OthersService {

  base_url = environment.BASE_URL
  product$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient) { 
  }

  // Products
  // products() {
  //   this.http.get(`${this.base_url}/Products`).subscribe((data: any) => {
  //     this.product$.next(data)
  //   })
  // }

  getProducts(search?: any) {
    if (search) {
      return this.http.get(`${this.base_url}/Products?search=${search}`)
    }
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

  updateProductQuantity(id: number | undefined, payload: any) {
    return this.http.patch(`${this.base_url}/Products/${id}/quantityupdate`, payload)
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.base_url}/Products/${id}`)
  }

  // Sales
  getSales(page: any, searchTerm?: any) {
    if(searchTerm) {
      return this.http.get(`${this.base_url}/DailySales?search=${searchTerm}`)
    }
    return this.http.get(`${this.base_url}/DailySales?page=${page}`)
  }
  
  getFilteredSales(obj: any) {
    return this.http.get(`${this.base_url}/DailySales?customername=${obj.customername}&itemsold=${obj.itemsold}&datesold__gte=${obj.startDateSold}&datesold__lte=${obj.endDateSold}&havepaid=${obj.havePaid}&datepaid__gte=${obj.startDatePaid}&datepaid__lte=${obj.endDatePaid}`)
  }

  // getSearchedSales(searchTerm: any) {
  //   return this.http.get(`${this.base_url}/DailySales?search=${searchTerm}`)
  // }

  postSales(payload: ISales) {
    return this.http.post(`${this.base_url}/DailySales/`, payload)
  }

  updateSales(payload: any, id: number) {
    return this.http.put(`${this.base_url}/DailySales/${id}`, payload)
  }

  updateHavepaid(payload: any, id: number) {
    return this.http.patch(`${this.base_url}/DailySales/${id}/paidupdate`, payload)
  }

  deleteSales(id: number) {
    return this.http.delete(`${this.base_url}/DailySales/${id}`)
  }

  // Accounts
  getDailyAccount() {
    return this.http.get(`${this.base_url}/DailySales/report`)
  }

  getWeeklyAccount() {
    return this.http.get(`${this.base_url}/DailySales/weeklyReport`)
  }

  getMonthlyAccount() {
    return this.http.get(`${this.base_url}/DailySales/monthlyReport`)
  }

  getAllAccount() {
    return this.http.get(`${this.base_url}/DailySales/filteredReport`)
  }

  getFilteredAccount(obj: any) {
    return this.http.get(`${this.base_url}/DailySales/filteredReport?datesold__gte=${obj.startDateSold}&datesold__lte=${obj.endDateSold}`)
  }
  
}
