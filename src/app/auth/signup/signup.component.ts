import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    last_name: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  isLoading: Boolean = false

  get first_name() {
    return this.form.controls['first_name']
  }

  get last_name() {
    return this.form.controls['last_name']
  }

  get username() {
    return this.form.controls['username']
  }

  get phone_number() {
    return this.form.controls['phone_number']
  }

  get email() {
    return this.form.controls['email']
  }

  get password() {
    return this.form.controls['password']
  }

  signin() {
    this.router.navigate(['/login'])
  }

  register() {
    this.isLoading = true
    let payload: IRegister = this.form.value
    this.auth.register(payload).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['/login'])
      }
    }).add(() => this.isLoading = false)
  }

}
