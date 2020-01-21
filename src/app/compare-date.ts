import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';

// export class DateValidators {
//     static dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
//         return (c: AbstractControl): { [key: string]: boolean } | null => {
//             const date1 = c.get(dateField1).value;
//             const date2 = c.get(dateField2).value;
//             console.log("date1",date1);
//             console.log("date2",date2);
//             // if ((date1 !== null && date2 !== null) && date1 > date2) {
//             //     return validatorField;
//             // }
//             if ((date1 !== null && date2 !== null) && date1 < date2) {
//                 return validatorField;
//             }
//             return null;
//         };
//     }
// }

export function compareStartDateValidator(dateField1: string, dateField2: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
        const date1 = group.controls[dateField1];
        const date2 = group.controls[dateField2];

        // console.log("date1 :",date1.value)
        // console.log("date2 :",date2.value)
        // if (date1.touched && date2.touched && date1.valid && date2.valid) {
            if ((date1.value !== null && date2.value !== null) && date1.value > date2.value) {
                // console.log("date1 :",date1.value)
                // console.log("date2 :",date2.value)
                return {'InvalidStartDate': true};
            }
        // }

        return null;
    };
}

export function compareEndDateValidator(dateField1: string, dateField2: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: boolean } | null => {
        const date1 = group.controls[dateField1];
        const date2 = group.controls[dateField2];

        // console.log("date1 :",date1.value)
        // console.log("date2 :",date2.value)
        // if (date1.touched && date2.touched && date1.valid && date2.valid) {
            if ((date1.value !== null && date2.value !== null) && date1.value > date2.value) {
                // console.log("date1 :",date1.value)
                // console.log("date2 :",date2.value)
                return {'InvalidEndDate': true};
            }
        // }

        return null;
    };
}