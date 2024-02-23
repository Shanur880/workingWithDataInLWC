import { LightningElement, api, wire } from 'lwc';
import getContactsBornAfter from '@salesforce/apex/ContactController.getContactsBornAfter';
export default class CallApexImperative extends LightningElement {
    @api minBirthDate;
    handleButtonClick() {
        getContactsBornAfter({ //imperative Apex call
            birthDate: this.minBirthDate
        })
            .then(contacts => {
                //code to execute if related contacts are returned successfully
            })
            .catch(error => {
                //code to execute if related contacts are not returned successfully
            });
    }
}