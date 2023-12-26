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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const CreateUser_dto_1 = require("../../dto/CreateUser.dto");
const users_service_1 = require("../../services/users/users.service");
const organization_service_1 = require("../../../organization/services/organization/organization.service");
const bcrypt_1 = require("bcrypt");
const UpdateUser_dto_1 = require("../../dto/UpdateUser.dto");
const decode_token_1 = require("../../../utils/middleware/decode-token");
let UsersController = class UsersController {
    constructor(userService, organizationService) {
        this.userService = userService;
        this.organizationService = organizationService;
    }
    async getUsers(accessToken) {
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        const users = await this.userService.findUsers(user.currentOrganization);
        return users;
    }
    async getUserById(id) {
        return await this.userService.findUserById(id);
    }
    async createUser(accessToken, createUserDto) {
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        const salt = 10;
        const hashedPassword = await (0, bcrypt_1.hash)(createUserDto.password, salt);
        const params = {
            username: createUserDto.username,
            password_hash: hashedPassword,
            email: createUserDto.email,
            account_status: 'active',
            registration_date: new Date(),
            last_login_date: null,
            first_name: createUserDto.firstName,
            last_name: createUserDto.lastName,
            phone_number: createUserDto.phoneNumber,
            current_organization: user.currentOrganization,
        };
        const res = await this.userService.createUser(params);
        await this.organizationService.assignOrganizationToUser(res.id, user.currentOrganization, createUserDto.roleId);
        return res;
    }
    async updateUserById(id, updateUserDto) {
        const params = {
            username: updateUserDto.username,
            email: updateUserDto.email,
            first_name: updateUserDto.firstName,
            last_name: updateUserDto.lastName,
            phone_number: updateUserDto.phoneNumber,
        };
        return await this.userService.updateUser(id, params);
    }
    async deleteUserById(id) {
        return await this.userService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        organization_service_1.OrganizationService])
], UsersController);
//# sourceMappingURL=users.controller.js.map