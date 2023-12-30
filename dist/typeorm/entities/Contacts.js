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
const PrimaryPersons_1 = require("./PrimaryPersons");
const PhoneNumber_1 = require("./PhoneNumber");
const BillingAddress_1 = require("./BillingAddress");
const DeliveryAddress_1 = require("./DeliveryAddress");
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
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Contacts.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PrimaryPersons_1.PrimaryPersons, primaryPerson => primaryPerson.contact),
    __metadata("design:type", Array)
], Contacts.prototype, "primaryPersons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PhoneNumber_1.PhoneNumber, phoneNumber => phoneNumber.contact),
    __metadata("design:type", Array)
], Contacts.prototype, "phoneNumbers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => BillingAddress_1.BillingAddress, billingAddress => billingAddress.contact, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", BillingAddress_1.BillingAddress)
], Contacts.prototype, "billingAddress", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => DeliveryAddress_1.DeliveryAddress, deliveryAddress => deliveryAddress.contact, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", DeliveryAddress_1.DeliveryAddress)
], Contacts.prototype, "deliveryAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Contacts.prototype, "is_billing_same_as_deliver", void 0);
exports.Contacts = Contacts = __decorate([
    (0, typeorm_1.Entity)()
], Contacts);
//# sourceMappingURL=Contacts.js.map