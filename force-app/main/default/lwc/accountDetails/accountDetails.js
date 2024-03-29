import { LightningElement, api, track, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import lwcEvaluate from '@salesforce/apex/FeatureFlags.lwcEvaluate';
import ID_FIELD from "@salesforce/schema/Account.Id";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import TYPE_FIELD from "@salesforce/schema/Account.Type";
import NUMBEROFEMPLOYEES_FIELD from "@salesforce/schema/Account.NumberOfEmployees";
import WEBSITE_FIELD from "@salesforce/schema/Account.Website";
import PHONE_FIELD from "@salesforce/schema/Account.Phone";
import ANNUALREVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import CLIENTSCORE_FIELD from "@salesforce/schema/Account.ClientScore__c";

const FIELDS = [
    ID_FIELD,
    NAME_FIELD,
    TYPE_FIELD,
    NUMBEROFEMPLOYEES_FIELD,
    WEBSITE_FIELD,
    PHONE_FIELD,
    ANNUALREVENUE_FIELD,
    INDUSTRY_FIELD,
    CLIENTSCORE_FIELD
];

export default class AccountDetails extends LightningElement {
    @api recordId;
    account;
    showNewUIComponents = false;
    mediaScore = 10.00; //This value could be obtained from a web service as well.
    
    @wire(getRecord, { 
        recordId: '$recordId', 
        fields: FIELDS
    }) account;

    get id() {
        return getFieldValue(this.account.data, ID_FIELD);
    }

    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }

    get aType() {
        return getFieldValue(this.account.data, TYPE_FIELD);
    }

    get numberOfEmployees() {
        return getFieldValue(this.account.data, NUMBEROFEMPLOYEES_FIELD);
    }

    get website() {
        return getFieldValue(this.account.data, WEBSITE_FIELD);
    }

    get phone() {
        return getFieldValue(this.account.data, PHONE_FIELD);
    }

    get annualRevenue() {
        return getFieldValue(this.account.data, ANNUALREVENUE_FIELD);
    }

    get industry() {
        return getFieldValue(this.account.data, INDUSTRY_FIELD);
    }

    get clientScore() {
        return getFieldValue(this.account.data, CLIENTSCORE_FIELD);
    }

    async connectedCallback() {

        let featureNewUIComponents = await lwcEvaluate({ featureName: 'featureNewUIComponents' });

        if(featureNewUIComponents){
            console.log('featureNewUIComponents is enabled. Show the new UI components');
            this.showNewUIComponents = true;
        }
        else{
            console.log('featureNewUIComponents is disabled. Show the old UI components');
            this.showNewUIComponents = false;
        }
    }

}