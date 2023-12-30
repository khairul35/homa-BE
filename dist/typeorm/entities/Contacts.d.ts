import { PrimaryPersons } from './PrimaryPersons';
import { PhoneNumber } from './PhoneNumber';
import { BillingAddress } from './BillingAddress';
import { DeliveryAddress } from './DeliveryAddress';
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
    notes: string;
    primaryPersons: PrimaryPersons[];
    phoneNumbers: PhoneNumber[];
    billingAddress: BillingAddress;
    deliveryAddress: DeliveryAddress;
    is_billing_same_as_deliver: boolean;
}
