import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord, updateRecord, deleteRecord } from 'lightning/uiRecordApi';

export default class ToastMessagesForObjectActions extends LightningElement {
    createRecordHandler(event) {
        const objectApiName = event.target.dataset.object;
        const fields = this.getFields(objectApiName, 'create');
        createRecord({ apiName: objectApiName, fields })
            .then(() => {
                this.showToast('Success', `${objectApiName} created successfully.`, 'success');
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    updateRecordHandler(event) {
        const objectApiName = event.target.dataset.object;
        const fields = this.getFields(objectApiName, 'update');
        // You should replace 'recordIdToUpdate' with the actual Id of the record you want to update
        fields.Id = 'recordIdToUpdate';
        updateRecord({ fields })
            .then(() => {
                this.showToast('Success', `${objectApiName} updated successfully.`, 'success');
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    deleteRecordHandler(event) {
        const objectApiName = event.target.dataset.object;
        // You should replace 'recordIdToDelete' with the actual Id of the record you want to delete
        deleteRecord('recordIdToDelete')
            .then(() => {
                this.showToast('Success', `${objectApiName} deleted successfully.`, 'success');
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    getFields(objectApiName, action) {
        const fields = {};
        if (objectApiName === 'Case') {
            fields.Subject = (action === 'create') ? 'New Case Subject' : 'Updated Case Subject';
            fields.Description = (action === 'create') ? 'New Case Description' : 'Updated Case Description';
        } else if (objectApiName === 'Opportunity') {
            fields.Name = (action === 'create') ? 'New Opportunity Name' : 'Updated Opportunity Name';
            fields.StageName = (action === 'create') ? 'Prospecting' : 'Closed Won';
            fields.CloseDate = new Date();
        }
        return fields;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}
