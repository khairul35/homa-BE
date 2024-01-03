import { CreateBillingAddress } from 'src/contact/types/CreateBillingAddress';
import { CreateContact } from 'src/contact/types/CreateContact';
import { CreateContactPhoneNumber } from 'src/contact/types/CreateContactPhoneNumber';
import { CreateContactPrimaryPerson } from 'src/contact/types/CreateContactPrimaryPerson';
import { CreateDeliveryAddress } from 'src/contact/types/CreateDeliveryAddress';
import { UpdateContact } from 'src/contact/types/UpdateContact';
import { ContactBillingAddress } from 'src/typeorm/entities/ContactBillingAddress';
import { ContactDeliveryAddress } from 'src/typeorm/entities/ContactDeliveryAddress';
import { ContactPhoneNumber } from 'src/typeorm/entities/ContactPhoneNumber';
import { ContactPrimaryPersons } from 'src/typeorm/entities/ContactPrimaryPersons';
import { Contacts } from 'src/typeorm/entities/Contacts';
import { Repository } from 'typeorm';
export declare class ContactService {
    private ContactRepository;
    private ContactBillingAddressRepository;
    private ContactDeliveryAddressRepository;
    private ContactPhoneNumberRepository;
    private ContactPrimaryPersonRepository;
    constructor(ContactRepository: Repository<Contacts>, ContactBillingAddressRepository: Repository<ContactBillingAddress>, ContactDeliveryAddressRepository: Repository<ContactDeliveryAddress>, ContactPhoneNumberRepository: Repository<ContactPhoneNumber>, ContactPrimaryPersonRepository: Repository<ContactPrimaryPersons>);
    findAllContact(organizationId: number): Promise<any>;
    findContactById(contactId: number): Promise<any>;
    deleteContactById(contactId: number): Promise<void>;
    createContact(body: Partial<CreateContact>): Promise<any>;
    updateContact(contactId: number, updatedData: Partial<UpdateContact>): Promise<Contacts>;
    createContactPhoneNumber(contactId: number, phoneNumbers: Partial<CreateContactPhoneNumber>[]): Promise<any[]>;
    createContactPrimaryPersons(contactId: number, primaryPersons: Partial<CreateContactPrimaryPerson>[]): Promise<any[]>;
    createBillingAddress(contactId: number, billingAddressData: Partial<CreateBillingAddress>): Promise<ContactBillingAddress>;
    createDeliveryAddress(contactId: number, deliveryAddressData: Partial<CreateDeliveryAddress>): Promise<ContactDeliveryAddress>;
}
