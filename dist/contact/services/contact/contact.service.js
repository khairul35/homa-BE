"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ContactBillingAddress_1 = require("../../../typeorm/entities/ContactBillingAddress");
const ContactDeliveryAddress_1 = require("../../../typeorm/entities/ContactDeliveryAddress");
const ContactPhoneNumber_1 = require("../../../typeorm/entities/ContactPhoneNumber");
const ContactPrimaryPersons_1 = require("../../../typeorm/entities/ContactPrimaryPersons");
const Contacts_1 = require("../../../typeorm/entities/Contacts");
const camelCaseToUnderscore_1 = require("../../../utils/camelCaseToUnderscore");
const underscoreToCamelCase_1 = require("../../../utils/underscoreToCamelCase");
const typeorm_2 = require("typeorm");
let ContactService = class ContactService {
    constructor(ContactRepository, ContactBillingAddressRepository, ContactDeliveryAddressRepository, ContactPhoneNumberRepository, ContactPrimaryPersonRepository) {
        this.ContactRepository = ContactRepository;
        this.ContactBillingAddressRepository = ContactBillingAddressRepository;
        this.ContactDeliveryAddressRepository = ContactDeliveryAddressRepository;
        this.ContactPhoneNumberRepository = ContactPhoneNumberRepository;
        this.ContactPrimaryPersonRepository = ContactPrimaryPersonRepository;
    }
    async findAllContact(organizationId) {
        const contacts = await this.ContactRepository
            .createQueryBuilder('contacts')
            .leftJoinAndSelect('contacts.contactBillingAddress', 'billingAddress')
            .leftJoinAndSelect('contacts.contactDeliveryAddress', 'deliveryAddress')
            .leftJoinAndSelect('contacts.contactPhoneNumber', 'phoneNumber')
            .leftJoinAndSelect('contacts.contactPrimaryPersons', 'primaryPersons')
            .where('contacts.organization_id = :organizationId', { organizationId })
            .andWhere('contacts.deletedDate IS NULL')
            .getMany();
        return (0, underscoreToCamelCase_1.underscoreToCamelCase)(contacts);
    }
    ;
    async findContactById(contactId) {
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
            throw new common_1.NotFoundException(`Contact with ID ${contactId} not found`);
        }
        return (0, underscoreToCamelCase_1.underscoreToCamelCase)(contact);
    }
    ;
    async deleteContactById(contactId) {
        const contact = await this.ContactRepository.findOne({ where: { id: contactId } });
        if (!contact) {
            throw new common_1.NotFoundException(`Contact with ID ${contactId} not found`);
        }
        contact.deletedDate = new Date();
        await this.ContactRepository.save(contact);
    }
    ;
    async createContact(body) {
        const data = (0, camelCaseToUnderscore_1.camelCaseToUnderscore)(body);
        const newContact = this.ContactRepository.create(data);
        await this.ContactRepository.save(newContact);
        return (0, underscoreToCamelCase_1.underscoreToCamelCase)(newContact);
    }
    ;
    async updateContact(contactId, updatedData) {
        const existingContact = await this.ContactRepository.findOne({ where: { id: contactId } });
        if (!existingContact) {
            throw new Error(`Contact with ID ${contactId} not found`);
        }
        Object.assign(existingContact, updatedData);
        const updatedContact = await this.ContactRepository.save(existingContact);
        return updatedContact;
    }
    async createContactPhoneNumber(contactId, phoneNumbers) {
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
    }
    ;
    async createContactPrimaryPersons(contactId, primaryPersons) {
        await this.ContactPrimaryPersonRepository.delete({ contact: { id: contactId } });
        const createdPrimaryPersons = [];
        for (const personData of primaryPersons) {
            const newPrimaryPerson = this.ContactPrimaryPersonRepository.create({
                contact: { id: contactId },
                ...personData,
            });
            const createdPerson = await this.ContactPrimaryPersonRepository.save(newPrimaryPerson);
            createdPrimaryPersons.push(createdPerson);
        }
        return createdPrimaryPersons;
    }
    ;
    async createBillingAddress(contactId, billingAddressData) {
        const existingBillingAddress = await this.ContactBillingAddressRepository.findOne({ where: { contact: { id: contactId } } });
        if (existingBillingAddress) {
            Object.assign(existingBillingAddress, billingAddressData);
            await this.ContactBillingAddressRepository.save(existingBillingAddress);
            return existingBillingAddress;
        }
        else {
            const newBillingAddress = this.ContactBillingAddressRepository.create({
                contact: { id: contactId },
                ...billingAddressData,
            });
            const createdBillingAddress = await this.ContactBillingAddressRepository.save(newBillingAddress);
            return createdBillingAddress;
        }
    }
    ;
    async createDeliveryAddress(contactId, deliveryAddressData) {
        const existingDeliveryAddress = await this.ContactDeliveryAddressRepository.findOne({ where: { contact: { id: contactId } } });
        if (existingDeliveryAddress) {
            Object.assign(existingDeliveryAddress, deliveryAddressData);
            await this.ContactDeliveryAddressRepository.save(existingDeliveryAddress);
            return existingDeliveryAddress;
        }
        else {
            const newDeliveryAddress = this.ContactDeliveryAddressRepository.create({
                contact: { id: contactId },
                ...deliveryAddressData,
            });
            const createdDeliveryAddress = await this.ContactDeliveryAddressRepository.save(newDeliveryAddress);
            return createdDeliveryAddress;
        }
    }
    ;
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Contacts_1.Contacts)),
    __param(1, (0, typeorm_1.InjectRepository)(ContactBillingAddress_1.ContactBillingAddress)),
    __param(2, (0, typeorm_1.InjectRepository)(ContactDeliveryAddress_1.ContactDeliveryAddress)),
    __param(3, (0, typeorm_1.InjectRepository)(ContactPhoneNumber_1.ContactPhoneNumber)),
    __param(4, (0, typeorm_1.InjectRepository)(ContactPrimaryPersons_1.ContactPrimaryPersons)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ContactService);
;
//# sourceMappingURL=contact.service.js.map