import Swal, { SweetAlertType } from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';


export const SWEET_ALERT = (
    alert_title?: string,
    alert_text?: string,
    alert_type?: SweetAlertType,
    alert_icon?: SweetAlertType,
    confBtn = 'OK',
    cancelBtn?: boolean,
    html?: boolean,
    cancelText?: string
) => {
    const options = {
        title: alert_title,
        type: alert_type,
        text: alert_text,
        icon: alert_icon,
        showCancelButton: !!cancelBtn,
        reverseButtons: true,
        confirmButtonClass: 'app_button secondary_btn',
        confirmButtonText: confBtn,
        cancelButtonClass: cancelBtn ? 'app_button cancel_btn' : '',
        cancelButtonText: cancelText,
    };
    return Swal.fire(options);
};

export const validateAllFormFields = (formGroup: FormGroup) => {         // {1}
    Object.keys(formGroup.controls).forEach(field => {  // {2}
        const control = formGroup.get(field);             // {3}
        if (control instanceof FormControl) {             // {4}
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        // {5}
            validateAllFormFields(control);            // {6}
        }
    });
};

export const utilVariables = {
    isLoading: false
}
