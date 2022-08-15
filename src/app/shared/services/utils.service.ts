import { Injectable, TemplateRef } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    modalRef: any = ''

    isLoading: boolean = false;

    objectId: number = 0

    numberOfProducts: number = 0
    numberOfSales: number = 0

    constructor(private location: Location, private modalService: BsModalService, private datePipe: DatePipe) {
    }

    goBack(): void {
        this.location.back();
    }

    triggerModal(template: TemplateRef<any>, type = ['modal-lg']): void {
        this.modalRef = this.modalService.show(template, { class: type.toString(), backdrop: 'static' });
    }

    // transformDate(date: string, format?: string): string {
    //     return this.datePipe.transform(date, format);
    // }
}