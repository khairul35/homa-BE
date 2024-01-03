import { ContactPrimaryPersons } from './ContactPrimaryPersons';
import { ContactPhoneNumber } from './ContactPhoneNumber';
import { ContactBillingAddress } from './ContactBillingAddress';
import { ContactDeliveryAddress } from './ContactDeliveryAddress';
export declare class Contacts {
    id: number;
    contact_name: string;
    account_number: string;
    you_owe: number;
    they_owe: number;
    status: string;
    type: string;
    website: string;
    registration_number: string;
    deletedDate: Date;
    createdDate: Date;
    notes: string;
    contactPrimaryPersons: ContactPrimaryPersons[];
    contactPhoneNumber: ContactPhoneNumber[];
    contactBillingAddress: ContactBillingAddress;
    contactDeliveryAddress: ContactDeliveryAddress;
    is_billing_same_as_deliver: boolean;
    organization_id: number;
}
