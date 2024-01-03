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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacts = void 0;
const typeorm_1 = require("typeorm");
const ContactPrimaryPersons_1 = require("./ContactPrimaryPersons");
const ContactPhoneNumber_1 = require("./ContactPhoneNumber");
const ContactBillingAddress_1 = require("./ContactBillingAddress");
const ContactDeliveryAddress_1 = require("./ContactDeliveryAddress");
let Contacts = class Contacts {
};
exports.Contacts = Contacts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contacts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contacts.prototype, "contact_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contacts.prototype, "account_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Contacts.prototype, "you_owe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Contacts.prototype, "they_owe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Archived', 'Active', 'Inactive'] }),
    __metadata("design:type", String)
], Contacts.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Customers', 'Suppliers'] }),
    __metadata("design:type", String)
], Contacts.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contacts.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contacts.prototype, "registration_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Contacts.prototype, "deletedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Contacts.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Contacts.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ContactPrimaryPersons_1.ContactPrimaryPersons, primaryPerson => primaryPerson.contact),
    __metadata("design:type", Array)
], Contacts.prototype, "contactPrimaryPersons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ContactPhoneNumber_1.ContactPhoneNumber, phoneNumber => phoneNumber.contact),
    __metadata("design:type", Array)
], Contacts.prototype, "contactPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ContactBillingAddress_1.ContactBillingAddress, billingAddress => billingAddress.contact, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", ContactBillingAddress_1.ContactBillingAddress)
], Contacts.prototype, "contactBillingAddress", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ContactDeliveryAddress_1.ContactDeliveryAddress, deliveryAddress => deliveryAddress.contact, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", ContactDeliveryAddress_1.ContactDeliveryAddress)
], Contacts.prototype, "contactDeliveryAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Contacts.prototype, "is_billing_same_as_deliver", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Contacts.prototype, "organization_id", void 0);
exports.Contacts = Contacts = __decorate([
    (0, typeorm_1.Entity)({ name: 'Contacts' })
], Contacts);
//# sourceMappingURL=Contacts.js.map