import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SWEET_ALERT } from 'src/app/shared/utils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public utils: UtilsService, private auth: AuthService, private router: Router) { }

  title: string = 'Settings'
  user: any
  unmatchedpassword?: string

  tabs = {
    activeTab: 'edit',
    active: true
  }

  form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(17), Validators.minLength(11)]),

  })

  resetForm = new FormGroup({
    // email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.getUserInfo()
  }

  get first_name() {
    return this.form.controls['first_name']
  }

  get last_name() {
    return this.form.controls['last_name']
  }

  get email() {
    return this.form.controls['email']
  }

  get username() {
    return this.form.controls['username']
  }

  get phone_number() {
    return this.form.controls['phone_number']
  }


  // get reset_email() {
  //   return this.resetForm.controls['email']
  // }

  get password() {
    return this.resetForm.controls['password']
  }

  get confirm_password() {
    return this.resetForm.controls['confirm_password']
  }

  getUserInfo() {
    let user: any = localStorage.getItem('User')
    this.user = JSON.parse(user)
    let userId: any = this.user.id
    this.utils.isLoading = true
    this.auth.getSingleUser(userId).subscribe(res => {this.form.patchValue(res); console.log(res)}).add(() => this.utils.isLoading = false)
  }

  switchTabs(tabName: string) {
    this.tabs.activeTab = tabName
    this.tabs.active = true
  }

  edit() {
    this.utils.isLoading = true
    let payload = this.form.value
    payload['id'] = this.user.id
    this.auth.updateUser(payload).subscribe(res => {
      SWEET_ALERT('Successful', `user ${payload['username']} updated successfully`, 'success', 'success', 'OK', false, undefined, undefined)
      localStorage.setItem('User', JSON.stringify(res))
      this.getUserInfo()
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

  reset() {
    this.utils.isLoading = true
    let payload = this.resetForm.value
    // if (payload['password'] !== payload['confirm_password']) {
    //   this.unmatchedpassword = "Password doesn't match"
    // }
    this.auth.resetPassword(payload).subscribe(res => console.log(res)).add(() => this.utils.isLoading = false)
  }

}
