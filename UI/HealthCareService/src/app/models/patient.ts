export class Patient {
    userId!: string;
    patient_name!: string;
    patient_gender!: string;
    patient_dob!: string;
    patient_mobile!: number;
    patient_email!: string;
    desc?: string;
    // regTime: Date;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}


// export class Patient {
//     // id: number;
//     firstName!: string;
//     lastName!: string;
//     gender!: string;
//     dob!: string;
//     mobile!: number;
//     email!: string;
//     description?: string;
//     registeredTime!: Date;

//     constructor(values: Object = {}) {
//         Object.assign(this, values);
//     }
// }