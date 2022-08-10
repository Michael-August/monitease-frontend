import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

  @Input() displayRows: Array<any> = []
  @Input() displayColumns: Array<{ key: string, value: string }> = []
  @Input() asActionCol = true;
  @Input() isLoading: boolean = false
  // @Input() itemsPerPage: number;
  // @Input() tableAction: TableAction;

  @Output() feedback: EventEmitter<any> = new EventEmitter<any>();

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  pageNumber = [10, 25, 50];

  // dataSource: MatTableDataSource<any>;

  // dataList$: Observable<any>;

  tableActionOption: TableAction = {
    hasEdit: true,
    hasDelete: true,
    hasView: false
  };

  constructor() {

  }

  ngOnInit(): void {
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.displayRows && !changes.displayRows.isFirstChange()) {
  //     const data = changes.displayRows.currentValue;
  //     this.dataSourceUpdate(data);
  //   }
  //   if (changes.tableAction) {
  //     this.tableActionOption = { ...this.tableActionOption, ...changes.tableAction.currentValue };
  //   }
  // }

  // ngAfterViewInit(): void {
  //   this.dataSourceUpdate(this.displayRows);
  // }

  // private dataSourceUpdate(tableData: Array<any>): void {
  //   this.dataSource = new MatTableDataSource<any>(tableData);
  //   this._changeDetectorRef.detectChanges();
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   this.dataList$ = this.dataSource.connect();
  // }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    // this.dataSource.filter = filterValue;
  }

  emitSingleAction(action: string, data: any): void {
    this.feedback.emit({ type: 'SINGLE_ACTION', action, data });
  }

}

interface TableAction {
  hasEdit?: boolean;
  hasDelete?: boolean;
  hasView?: boolean;

}
