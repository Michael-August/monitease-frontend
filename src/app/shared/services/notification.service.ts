import {Injectable} from '@angular/core';
import {IndividualConfig, ToastrService} from 'ngx-toastr';
import Swal, {SweetAlertType} from 'sweetalert2';

export enum ToasterType {
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
  Error = 'error'
}
export enum ModalSize {
  Large = 'modal-lg',
  Medium = 'modal-md',
  Small = 'modal-sm'
}
export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
  Confirm = 'question',
}

@Injectable({
  providedIn: 'any'
})
export class NotificationService {

  constructor() {
  }

  individualConfig: Partial<IndividualConfig> = {
    positionClass: 'toast-bottom-right',
    progressBar: false,
    closeButton: true,
    onActivateTick: true,
    enableHtml: false,
  };

//   notifyByToast(
//     message: string,
//     type?: ToasterType,
//     timeout: number = 3000,
//     closeButton?: boolean,
//     progressBar?: boolean
//   ): void {
//     switch (type) {
//       case ToasterType.Error:
//         this.toastr.error(message, '', {
//           timeOut: timeout,
//           closeButton,
//           progressBar
//         });
//         break; // TODO: MORE TYPE SCENARIOS
//       case ToasterType.Info:
//         this.toastr.info(message, '', {
//           timeOut: timeout,
//           closeButton,
//           progressBar
//         });
//         break;
//       case ToasterType.Success:
//         this.toastr.success(message, '', {
//           timeOut: timeout,
//           closeButton,
//           progressBar
//         });
//         break;

//       case ToasterType.Warning:
//         this.toastr.warning(message, '', {
//           timeOut: timeout,
//           closeButton,
//           progressBar
//         });
//         break;
//       default:
//         this.toastr.show(
//           message,                // message
//           '',                     // title
//           this.individualConfig,  // IndividualConfig or GlobalConfig
//           type                    // 'toast-success', 'toast-error', 'toast-warning' or 'toast-info'
//         );
//         break;
//     }
//   }


  popUpAlert(
    title: string,
    html: any,
    type?: SweetAlertType | null,
    showCancelButton: boolean = false,
    confirmButtonText?: string,
    cancelButtonText = 'cancel',
  ): Promise<any> | void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn primary__btn mr3',
        cancelButton: 'btn btn-green ml-2'
      },
      buttonsStyling: true
    });

    if (type === AlertType.Confirm) {
      return swalWithBootstrapButtons.fire({
        title,
        html,
        showCancelButton,
        cancelButtonText
      });
    }

    swalWithBootstrapButtons.fire({
      title,
      html,
      showCancelButton,
      cancelButtonText
    });
  }
}