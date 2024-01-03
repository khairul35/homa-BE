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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const contact_service_1 = require("../../services/contact/contact.service");
const users_service_1 = require("../../../users/services/users/users.service");
const decode_token_1 = require("../../../utils/middleware/decode-token");
let ContactController = class ContactController {
    constructor(contactService, userService) {
        this.contactService = contactService;
        this.userService = userService;
    }
    async findAll(accessToken) {
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        if (!user?.currentOrganization)
            return [];
        const contacts = await this.contactService.findAllContact(user.currentOrganization);
        return contacts;
    }
    ;
    async findById(contactId) {
        if (!contactId)
            throw new common_1.HttpException('contactId is required', common_1.HttpStatus.BAD_REQUEST);
        const contact = await this.contactService.findContactById(contactId);
        return contact;
    }
    ;
    async createContact(accessToken, body) {
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        const createContactParam = {
            contactName: body?.contactName,
            accountNumber: body?.accountNumber,
            youOwe: body?.youOwe,
            theyOwe: body?.theyOwe,
            status: body?.status,
            type: body?.type,
            website: body?.website,
            registrationNumber: body?.registrationNumber,
            notes: body?.notes,
            isBillingSameAsDelivery: body?.isBillingSameAsDelivery,
            organizationId: user?.currentOrganization,
        };
        const contact = await this.contactService.createContact(createContactParam);
        await this.contactService.createContactPhoneNumber(contact?.id, body?.contactPhoneNumber);
        await this.contactService.createContactPrimaryPersons(contact?.id, body?.contactPrimaryPerson);
        return await this.contactService.findContactById(contact?.id);
    }
    ;
    async updateBillingAddress(body, accessToken, contactId) {
        if (!contactId)
            throw new common_1.HttpException('contactId is required', common_1.HttpStatus.BAD_REQUEST);
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        await this.contactService.createBillingAddress(contactId, body);
        return await this.contactService.findAllContact(user.currentOrganization);
    }
    async updateDeliveryAddress(body, accessToken, contactId) {
        if (!contactId)
            throw new common_1.HttpException('contactId is required', common_1.HttpStatus.BAD_REQUEST);
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        await this.contactService.createDeliveryAddress(contactId, body);
        return await this.contactService.findAllContact(user.currentOrganization);
    }
    async updateContact(accessToken, body, contactId) {
        if (!contactId)
            throw new common_1.HttpException('contactId is required', common_1.HttpStatus.BAD_REQUEST);
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        const updateContactParam = {
            contactName: body?.contactName,
            accountNumber: body?.accountNumber,
            youOwe: body?.youOwe,
            theyOwe: body?.theyOwe,
            status: body?.status,
            type: body?.type,
            website: body?.website,
            registrationNumber: body?.registrationNumber,
            notes: body?.notes,
            isBillingSameAsDelivery: body?.isBillingSameAsDelivery,
            organizationId: user?.currentOrganization,
        };
        const contact = await this.contactService.updateContact(contactId, updateContactParam);
        await this.contactService.createContactPhoneNumber(contact?.id, body?.contactPhoneNumber);
        await this.contactService.createContactPrimaryPersons(contact?.id, body?.contactPrimaryPerson);
        return await this.contactService.findContactById(contact?.id);
    }
    ;
    async deleteContact(contactId) {
        if (!contactId)
            throw new common_1.HttpException('contactId is required', common_1.HttpStatus.BAD_REQUEST);
        await this.contactService.deleteContactById(contactId);
        return 'Contact Delete Successfully';
    }
    ;
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':contactId'),
    __param(0, (0, common_1.Param)('contactId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "createContact", null);
__decorate([
    (0, common_1.Put)('billing-address/:contactId'),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Param)('contactId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "updateBillingAddress", null);
__decorate([
    (0, common_1.Put)('delivery-address/:contactId'),
    __param(1, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Param)('contactId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "updateDeliveryAddress", null);
__decorate([
    (0, common_1.Put)(':contactId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(2, (0, common_1.Param)('contactId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "updateContact", null);
__decorate([
    (0, common_1.Delete)(':contactId'),
    __param(0, (0, common_1.Param)('contactId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "deleteContact", null);
exports.ContactController = ContactController = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService,
        users_service_1.UsersService])
], ContactController);
;
//# sourceMappingURL=contact.controller.js.map