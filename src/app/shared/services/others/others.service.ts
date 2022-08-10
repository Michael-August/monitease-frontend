import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OthersService {

  base_url = BASE_URL
  product$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(private http: HttpClient) { 
    this.products()
  }

  // Products
  products() {
    this.http.get(`${this.base_url}/Products/`).subscribe((data: any) => {
      this.product$.next(data)
    })
  }

  getProducts(): Observable<any> {
    return this.product$.asObservable()
  }

  postProduct(payload: any) {
    return this.http.post(`${this.base_url}/Products/`, payload)
  }
  
}
