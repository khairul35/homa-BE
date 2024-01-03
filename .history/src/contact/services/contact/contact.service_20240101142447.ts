import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactBillingAddress } from 'src/typeorm/entities/ContactBillingAddress';
import { Contacts } from 'src/typeorm/entities/Contacts';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contacts, ContactBillingAddress)
        private ContactRepository: Repository<Contacts>,
        private ContactBillingAddressRepository: Repository<ContactBillingAddress>
    ) {}
}
