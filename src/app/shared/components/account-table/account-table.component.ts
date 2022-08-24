import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
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

  @ViewChild('account', {static: false}) accountTable!: ElementRef
  @Input() displayColumns: any = []
  @Input() displayRows: any
  @Input() res: any
  @Output() emitSearch: EventEmitter<any> = new EventEmitter()


  search(value: any) {
    this.emitSearch.emit(value)
  }

  // emitGenerator() {
  //   let pdf = new jsPDF({
  //     unit: "mm",
  //     format: 'a0'
  //   })

  //   pdf.html(this.accountTable.nativeElement, {
  //     callback: (pdf) => {
  //       pdf.save('account.pdf')
  //     }
  //   })
  // }

  emitGenerator() {
    window.print()
  }

}
