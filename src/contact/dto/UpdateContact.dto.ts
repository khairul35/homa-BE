import { CreateContactPhoneNumber, CreateContactPrimaryPersonDto } from "./CreateContact.dto";

export interface UpdateContactDto {
    contactName: string;
    accountNumber: string;
    youOwe: number;
    theyOwe: number;
    status: 'Archived' | 'Active' | 'Inactive';
    type: 'Customers' | 'Suppliers';
    website: string;
    registrationNumber: string;
    deletedDate?: Date | null;
    notes: string;
    isBillingSameAsDelivery: boolean;
    organizationId: number;
    contactPrimaryPerson: Partial<CreateContactPrimaryPersonDto>[];
    contactPhoneNumber: Partial<CreateContactPhoneNumber>[];
}
