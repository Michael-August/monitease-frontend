import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
declare var $: any

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnChanges {

  constructor(private authSrv: AuthService) { }

  userInfo: any = ''

  @Input() sideBarState: boolean = true
  showMenu?: boolean

  ngOnInit(): void {
    let user: string = localStorage.getItem('User') as string
    this.userInfo = JSON.parse(user)

    console.log(this.showMenu);
    
  }

  // toggleMenu() {
  //   this.showMenu = !this.showMenu
  // }

  ngOnChanges() {
    this.showMenu = this.sideBarState
    console.log(this.showMenu);
  }

  logout(){
    this.authSrv.logout()
  }

}
