import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        contact.deletedDate = new Date();;
        await this.ContactRepository.save(contact);
    };

    async createContact(body: any) {
        const data = camelCaseToUnderscore(body);
        const newContact =  this.ContactRepository.create(data);
        await this.ContactRepository.save(newContact);
        return underscoreToCamelCase(newContact);
    };
};
