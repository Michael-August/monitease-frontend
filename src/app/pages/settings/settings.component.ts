import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public utils: UtilsService) { }

  title: string = 'Settings'

  tabs = {
    activeTab: 'edit',
    active: true
  }

  form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.maxLength(17), Validators.minLength(11)]),

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

  getUserInfo() {

  }

  switchTabs(tabName: string) {
    this.tabs.activeTab = tabName
    this.tabs.active = true
  }

  submit() {

  }

}
