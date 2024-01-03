"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModule = void 0;
const common_1 = require("@nestjs/common");
const contact_controller_1 = require("./controller/contact/contact.controller");
const contact_service_1 = require("./services/contact/contact.service");
const typeorm_1 = require("@nestjs/typeorm");
const Auth_1 = require("../typeorm/entities/Auth");
const User_1 = require("../typeorm/entities/User");
const Contacts_1 = require("../typeorm/entities/Contacts");
const ContactDeliveryAddress_1 = require("../typeorm/entities/ContactDeliveryAddress");
const ContactBillingAddress_1 = require("../typeorm/entities/ContactBillingAddress");
const ContactPhoneNumber_1 = require("../typeorm/entities/ContactPhoneNumber");
const ContactPrimaryPersons_1 = require("../typeorm/entities/ContactPrimaryPersons");
const auth_service_1 = require("../auth/services/auth/auth.service");
const users_service_1 = require("../users/services/users/users.service");
let ContactModule = class ContactModule {
};
exports.ContactModule = ContactModule;
exports.ContactModule = ContactModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Auth_1.Auth, User_1.User, Contacts_1.Contacts, ContactDeliveryAddress_1.ContactDeliveryAddress, ContactBillingAddress_1.ContactBillingAddress, ContactPhoneNumber_1.ContactPhoneNumber, ContactPrimaryPersons_1.ContactPrimaryPersons])],
        controllers: [contact_controller_1.ContactController],
        providers: [contact_service_1.ContactService, auth_service_1.AuthService, users_service_1.UsersService]
    })
], ContactModule);
//# sourceMappingURL=contact.module.js.map