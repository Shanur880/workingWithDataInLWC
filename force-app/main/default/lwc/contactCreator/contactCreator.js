import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName'; // Corrected
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email'; // Corrected
import EmailEncodingKey from '@salesforce/schema/User.EmailEncodingKey';

export default class ContactCreator extends LightningElement {
    objectApiName = CONTACT_OBJECT;
    fields = [NAME_FIELD, FIRSTNAME_FIELD, LASTNAME_FIELD,EMAIL_FIELD]; // Corrected

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}
