import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IRegister } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AlertType, NotificationService } from 'src/app/shared/services/notification.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SWEET_ALERT, validateAllFormFields } from 'src/app/shared/utils';
import { IUsers } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title: string = 'Users'

  tableColumns = [
    { key: 'first_name', value: 'First Name' },
    { key: 'last_name', value: 'Last Name' },
    { key: 'username', value: 'Username' },
    { key: 'phone_number', value: 'Phone Number' },
    { key: 'email', value: 'Email' },
    { key: 'role', value: 'Role' },
    { key: 'is_verified', value: 'Is Verified' }
  ]

  datasource?: Observable<any>

  form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    is_verified: new FormControl('', [Validators.required])
  })
  isNew: Boolean = true

  get first_name() {
    return this.form.controls['first_name']
  }

  get last_name() {
    return this.form.controls['last_name']
  }

  get username() {
    return this.form.controls['username']
  }

  get password() {
    return this.form.controls['password']
  }

  get phone_number() {
    return this.form.controls['phone_number']
  }

  get email() {
    return this.form.controls['email']
  }

  get role() {
    return this.form.controls['role']
  }

  get is_verified() {
    return this.form.controls['is_verified']
  }

  constructor(public utils: UtilsService, private auth: AuthService, private alertService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  changeRole(e: any) {
    this.role.setValue(e.target.value, {
      onlySelf: true,
    });

  }

  getUsers() {
    this.utils.isLoading = true
    this.datasource = this.auth.getUsers().pipe(
      tap(() => this.utils.isLoading = false)
    )
  }

  submit() {
    if (this.form.invalid) {
      return validateAllFormFields(this.form)
    }
    const payload = this.form.value;
    if (this.utils.objectId) {
      payload['id'] = this.utils.objectId;
      this.process_submission(payload, false);
      this.getUsers()
      return;
    }
    this.process_submission(payload)
    this.getUsers()
  }

  private process_submission(payload: any, newSubmission: boolean = true) {
    this.utils.isLoading = true
    const apiToCall = newSubmission ? this.auth.register(payload) : this.auth.updateUser(payload)

    apiToCall.subscribe(res => {
      this.utils.modalRef.hide()
      SWEET_ALERT('Successful', `User ${this.username.value} successfully registered`, 'success', 'success', 'OK', false, undefined, undefined)
    }, err => {
      this.utils.modalRef.hide()
      console.log(err)
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

  private process_delete(id: number) {
    this.utils.isLoading = true
    this.auth.deleteUser(id).subscribe(res => {
      SWEET_ALERT('Successful', `User deleted successfully`, 'success', 'success', 'OK', false, undefined, undefined)
      this.getUsers()
      console.log('Done')
    }, err => {
      if (err.status === 403) {
        this.router.navigate(['/dashboard'])
        SWEET_ALERT('Unauthorized', 'You are not authorized to perform this action', 'error', 'error', 'ok', false, undefined, undefined)
      } else {
        SWEET_ALERT('Failed', `${err.error.message}`, 'error', 'error', 'OK', false, undefined, undefined)
      }
    }).add(() => this.utils.isLoading = false)
  }

  tableAction(event: { action: string, type: string, data: IUsers }, modal: TemplateRef<any>) {
    switch (event.action) {
      case 'EDIT':
        this.utils.triggerModal(modal, ['modal-md, modal-dialog-centered'])
        this.form.patchValue(event.data)
        this.utils.objectId = event.data.id
        break;
      case 'DELETE':
        (this.alertService.popUpAlert('', `Are you sure you want to Delete ${event.data.first_name}?`,
          AlertType.Confirm, true) as Promise<any>).then((arg) => {
            if (arg.value) {
              this.process_delete(event.data.id);
            }
          });
        break
    }
  }

}
