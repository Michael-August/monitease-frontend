import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BASE_URL } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ILogin, IRegister } from 'src/app/core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // base_url = environment.BASE_URL
  base_url = BASE_URL

  constructor(private http: HttpClient, private router: Router) { }

  login (payload: ILogin) {
    return this.http.post(`${this.base_url}/Authentication/login`, payload)
  }

  register (payload: IRegister) {
    return this.http.post(`${this.base_url}/Authentication/register`, payload)
  }

  getUsers() {
    return this.http.get(`${this.base_url}/Authentication`)
  }

  getSingleUser(id: number) {
    return this.http.get(`${this.base_url}/Authentication/${id}`)
  }

  updateUser(payload: any) {
    return this.http.put(`${this.base_url}/Authentication/${payload.id}`, payload)
  }

  resetPassword(payload: any) {
    return this.http.patch(`${this.base_url}/Authentication/resetpassword`, payload)
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.base_url}/Authentication/${id}`)
  }

  logout () {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
