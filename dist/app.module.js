"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("./typeorm/entities/User");
const users_module_1 = require("./users/users.module");
const Auth_1 = require("./typeorm/entities/Auth");
const auth_module_1 = require("./auth/auth.module");
const organization_module_1 = require("./organization/organization.module");
const Organization_1 = require("./typeorm/entities/Organization");
const UserOrganization_1 = require("./typeorm/entities/UserOrganization");
const Contacts_1 = require("./typeorm/entities/Contacts");
const ContactBillingAddress_1 = require("./typeorm/entities/ContactBillingAddress");
const ContactDeliveryAddress_1 = require("./typeorm/entities/ContactDeliveryAddress");
const ContactPhoneNumber_1 = require("./typeorm/entities/ContactPhoneNumber");
const ContactPrimaryPersons_1 = require("./typeorm/entities/ContactPrimaryPersons");
const contact_module_1 = require("./contact/contact.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'admin',
                password: 'Noneedpassword23!',
                database: 'Production',
                entities: [
                    User_1.User,
                    Auth_1.Auth,
                    Organization_1.Organization,
                    UserOrganization_1.UserOrganization,
                    Contacts_1.Contacts,
                    ContactBillingAddress_1.ContactBillingAddress,
                    ContactDeliveryAddress_1.ContactDeliveryAddress,
                    ContactPhoneNumber_1.ContactPhoneNumber,
                    ContactPrimaryPersons_1.ContactPrimaryPersons
                ],
                synchronize: false,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            organization_module_1.OrganizationModule,
            contact_module_1.ContactModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map