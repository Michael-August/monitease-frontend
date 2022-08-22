import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.css']
})
export class AccountTableComponent implements OnInit {

  constructor(public utils: UtilsService) { }

  ngOnInit(): void {
  }

  @Input() displayColumns: any = []
  @Input() displayRows: any
  @Input() res: any
  @Output() emitSearch: EventEmitter<any> = new EventEmitter()


  search(value: any) {
    this.emitSearch.emit(value)
  }

}
