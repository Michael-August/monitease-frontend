import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin, IRegister } from 'src/app/core/models/auth.model';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url = BASE_URL

  constructor(private http: HttpClient, private router: Router) { }

  login (payload: ILogin) {
    return this.http.post(`${this.base_url}/Authentication/login`, payload)
  }

  register (payload: IRegister) {
    return this.http.post(`${this.base_url}/Authentication/register`, payload)
  }

  logout () {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
