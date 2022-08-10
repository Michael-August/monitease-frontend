import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SWEET_ALERT, utilVariables, validateAllFormFields } from 'src/app/shared/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  isLoading = utilVariables.isLoading

  ngOnInit(): void {
  }

  get email() {
    return this.form.controls['email']
  }

  get password() {
    return this.form.controls['password']
  }

  signup () {
    this.router.navigate(['/register'])
  }

  login() {
    this.isLoading = true
    let payload: ILogin = this.form.value
    if (this.form.invalid) {
      return validateAllFormFields(this.form);
    }
    this.auth.login(payload).subscribe((res: any) => {  
      if (res.success) {
        localStorage.setItem('Token', res.token)
        let user = JSON.stringify(res.user)
        localStorage.setItem('User', user)
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Successful', 'Logged in successfully', 'success', 'success', 'OK', false, false, undefined)
      } 
    }, err => {      
      if (err) {
        SWEET_ALERT('Failed', `${err.error.error}`, 'error', 'error', 'OK', false, false, undefined)
        this.router.navigate(['/login'])
      }
    }).add(() => this.isLoading = false)
  }

}

// { success: true, message: "User is logged in successfully",… }
// message: "User is logged in successfully"
// success: true
// token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImF1Z3VzdEBnbWFpbC5jb20iLCJyb2xlIjoiT1RIRVJTIn0.trzbeXLEPPk07BtSlztynsGSb5toNvi-Fo6y0GThLQU"
// user: { id: 2, username: "michaelaugust", first_name: "Michael", last_name: "August",… }
// created_at: "2022-08-06T21:33:14.385253Z"
// email: "august@gmail.com"
// first_name: "Michael"
// groups: []
// id: 2
// is_active: true
// is_staff: false
// is_superuser: false
// is_verified: false
// last_login: null
// last_name: "August"
// phone_number: "07089645904"
// role: "OTHERS"
// updated_at: "2022-08-06T21:33:14.549403Z"
// user_permissions: []
// username: "michaelaugust"
