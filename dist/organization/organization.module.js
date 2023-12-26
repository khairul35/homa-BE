"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Organization_1 = require("../typeorm/entities/Organization");
const Auth_1 = require("../typeorm/entities/Auth");
const organization_controller_1 = require("./controllers/organization/organization.controller");
const auth_service_1 = require("../auth/services/auth/auth.service");
const organization_service_1 = require("./services/organization/organization.service");
const User_1 = require("../typeorm/entities/User");
const users_service_1 = require("../users/services/users/users.service");
const UserOrganization_1 = require("../typeorm/entities/UserOrganization");
let OrganizationModule = class OrganizationModule {
};
exports.OrganizationModule = OrganizationModule;
exports.OrganizationModule = OrganizationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Organization_1.Organization, Auth_1.Auth, User_1.User, UserOrganization_1.UserOrganization])],
        controllers: [organization_controller_1.OrganizationController],
        providers: [auth_service_1.AuthService, organization_service_1.OrganizationService, users_service_1.UsersService],
    })
], OrganizationModule);
//# sourceMappingURL=organization.module.js.map