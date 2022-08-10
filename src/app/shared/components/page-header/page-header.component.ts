import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  constructor(public utils: UtilsService) { }

  ngOnInit(): void {
  }

  @Input() pageTitle: string = ''
  @Input() buttonLabel: string = ''
  @Input() showAddButton: boolean = true

  @Output() buttonAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  triggerAddButton() {
    this.buttonAction.emit(true)
  }

}
