import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
import { camelCaseToUnderscore } from 'src/utils/camelCaseToUnderscore';
import { underscoreToCamelCase } from 'src/utils/underscoreToCamelCase';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contacts)
        private ContactRepository: Repository<Contacts>,
        @InjectRepository(ContactBillingAddress)
        private ContactBillingAddressRepository: Repository<ContactBillingAddress>,
        @InjectRepository(ContactDeliveryAddress)
        private ContactDeliveryAddressRepository: Repository<ContactDeliveryAddress>,
        @InjectRepository(ContactPhoneNumber)
        private ContactPhoneNumberRepository: Repository<ContactPhoneNumber>,
        @InjectRepository(ContactPrimaryPersons)
        private ContactPrimaryPersonRepository: Repository<ContactPrimaryPersons>,
    ) {}

    async findAllContact(organizationId: number) {
        const contacts = await this.ContactRepository
                .createQueryBuilder('contacts')
                .leftJoinAndSelect('contacts.contactBillingAddress', 'billingAddress')
                .leftJoinAndSelect('contacts.contactDeliveryAddress', 'deliveryAddress')
                .leftJoinAndSelect('contacts.contactPhoneNumber', 'phoneNumber')
                .leftJoinAndSelect('contacts.contactPrimaryPersons', 'primaryPersons')
                .where('contacts.organization_id = :organizationId', { organizationId })
                .andWhere('contacts.deletedDate IS NULL')
                .getMany();
        return underscoreToCamelCase(contacts);
    };

    async findContactById(contactId: number) {
        const contact = await this.ContactRepository
        .createQueryBuilder('contacts')
        .leftJoinAndSelect('contacts.contactBillingAddress', 'billingAddress')
        .leftJoinAndSelect('contacts.contactDeliveryAddress', 'deliveryAddress')
        .leftJoinAndSelect('contacts.contactPhoneNumber', 'phoneNumber')
        .leftJoinAndSelect('contacts.contactPrimaryPersons', 'primaryPersons')
        .where('contacts.id = :contactId', { contactId })
        .andWhere('contacts.deletedDate IS NULL')
        .getOne();

        if (!contact) {
            throw new NotFoundException(`Contact with ID ${contactId} not found`);
        }

        return underscoreToCamelCase(contact);
    };

    async deleteContactById(contactId: number) {
        const contact = await this.ContactRepository.findOne({ where: { id: contactId } });

        if (!contact) {
            throw new NotFoundException(`Contact with ID ${contactId} not found`);
        }

        // Soft delete by updating deletedDate with current datetime
        contact.deletedDate = new Date();
        await this.ContactRepository.save(contact);
    };

    async createContact(body: CreateContact) {
        const data = camelCaseToUnderscore(body);
        const newContact =  this.ContactRepository.create(data);
        await this.ContactRepository.save(newContact);
        return underscoreToCamelCase(newContact);
    };

    async updateContact(contactId: number, updatedData: UpdateContact) {
        const existingContact = await this.ContactRepository.findOne({ where: { id: contactId } });

        if (!existingContact) {
            // Handle the scenario where the contact doesn't exist
            // For example, throw an error or return null
            throw new Error(`Contact with ID ${contactId} not found`);
        }

        // Update the existing contact's fields with the provided data
        Object.assign(existingContact, updatedData);

        // Save the updated contact to the database
        const updatedContact = await this.ContactRepository.save(existingContact);
        
        return updatedContact;
    }

    async createContactPhoneNumber(contactId: number, phoneNumbers: CreateContactPhoneNumber[]) {
        // Delete existing phone numbers for the given contactId
        await this.ContactPhoneNumberRepository.delete({ contact: { id: contactId } });

        const createdPhoneNumbers = [];

        for (const phoneNumberData of phoneNumbers) {
            const newPhoneNumber = this.ContactPhoneNumberRepository.create({
                contact: { id: contactId },
                ...phoneNumberData,
            });
            const createdPhoneNumber = await this.ContactPhoneNumberRepository.save(newPhoneNumber);
            createdPhoneNumbers.push(createdPhoneNumber);
        }

        return createdPhoneNumbers;
    };

    async createContactPrimaryPersons(contactId: number, primaryPersons: CreateContactPrimaryPerson[]) {
    // Delete existing primary persons for the given contactId
        await this.ContactPrimaryPersonRepository.delete({ contact: { id: contactId } });

        const createdPrimaryPersons = [];

        for (const personData of primaryPersons) {
            const newPrimaryPerson = this.ContactPrimaryPersonRepository.create({
                contact: { id: contactId }, // Set the relationship to the contact
                ...personData,
            });
            const createdPerson = await this.ContactPrimaryPersonRepository.save(newPrimaryPerson);
            createdPrimaryPersons.push(createdPerson);
        }

        return createdPrimaryPersons;
    };

    async createBillingAddress(contactId: number, billingAddressData: CreateBillingAddress) {
        const existingBillingAddress = await this.ContactBillingAddressRepository.findOne({ where: { contact: { id: contactId } } });

        if (existingBillingAddress) {
            // Update existing billing address
            Object.assign(existingBillingAddress, billingAddressData);
            await this.ContactBillingAddressRepository.save(existingBillingAddress);
            return existingBillingAddress;
        } else {
            // Create new billing address
            const newBillingAddress = this.ContactBillingAddressRepository.create({
                contact: { id: contactId }, // Set the relationship to the contact
                ...billingAddressData,
            });
            const createdBillingAddress = await this.ContactBillingAddressRepository.save(newBillingAddress);
            return createdBillingAddress;
        }
    };
    
    async createDeliveryAddress(contactId: number, deliveryAddressData: CreateDeliveryAddress) {
        const existingDeliveryAddress = await this.ContactDeliveryAddressRepository.findOne({ where: { contact: { id: contactId } } });

        if (existingDeliveryAddress) {
            // Update existing delivery address
            Object.assign(existingDeliveryAddress, deliveryAddressData);
            await this.ContactDeliveryAddressRepository.save(existingDeliveryAddress);
            return existingDeliveryAddress;
        } else {
            // Create new delivery address
            const newDeliveryAddress = this.ContactDeliveryAddressRepository.create({
                contact: { id: contactId }, // Set the relationship to the contact
                ...deliveryAddressData,
            });
            const createdDeliveryAddress = await this.ContactDeliveryAddressRepository.save(newDeliveryAddress);
            return createdDeliveryAddress;
        }
    };
};
