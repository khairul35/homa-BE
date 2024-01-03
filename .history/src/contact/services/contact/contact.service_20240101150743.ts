import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactBillingAddress } from 'src/typeorm/entities/ContactBillingAddress';
import { ContactDeliveryAddress } from 'src/typeorm/entities/ContactDeliveryAddress';
import { ContactPhoneNumber } from 'src/typeorm/entities/ContactPhoneNumber';
import { ContactPrimaryPersons } from 'src/typeorm/entities/ContactPrimaryPersons';
import { Contacts } from 'src/typeorm/entities/Contacts';
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
        .getMany();

  return underscoreToCamelCase(contacts);
}

}
