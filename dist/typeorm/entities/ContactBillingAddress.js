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
exports.ContactBillingAddress = void 0;
const typeorm_1 = require("typeorm");
const Contacts_1 = require("./Contacts");
let ContactBillingAddress = class ContactBillingAddress {
};
exports.ContactBillingAddress = ContactBillingAddress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContactBillingAddress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactBillingAddress.prototype, "attention", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactBillingAddress.prototype, "address_line_1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactBillingAddress.prototype, "address_line_2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactBillingAddress.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactBillingAddress.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactBillingAddress.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactBillingAddress.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Contacts_1.Contacts, contact => contact.contactBillingAddress),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Contacts_1.Contacts)
], ContactBillingAddress.prototype, "contact", void 0);
exports.ContactBillingAddress = ContactBillingAddress = __decorate([
    (0, typeorm_1.Entity)({ name: 'ContactBillingAddress' })
], ContactBillingAddress);
//# sourceMappingURL=ContactBillingAddress.js.map