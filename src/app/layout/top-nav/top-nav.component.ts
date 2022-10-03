import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
declare var $: any

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(public utils: UtilsService) { }

  @Output() toggleBoolean = new EventEmitter()
  opened?: boolean
  showMenu = false

  ngOnInit(): void {

  }

  toggleSideBar() {
    this.showMenu = !this.showMenu
    this.toggleBoolean.emit(this.showMenu)
  }

}
