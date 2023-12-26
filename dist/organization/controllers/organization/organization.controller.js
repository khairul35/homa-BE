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
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const organization_service_1 = require("../../services/organization/organization.service");
const users_service_1 = require("../../../users/services/users/users.service");
const decode_token_1 = require("../../../utils/middleware/decode-token");
let OrganizationController = class OrganizationController {
    constructor(organizationService, userService) {
        this.organizationService = organizationService;
        this.userService = userService;
    }
    async findMe(accessToken) {
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        const organization = await this.organizationService.findById(user.currentOrganization);
        return organization;
    }
    async findAllMe(accessToken) {
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        const organizations = await this.organizationService.findOrganizationsByUserId(user.id);
        return organizations;
    }
    async createOrganization(accessToken, body) {
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        const organization = await this.organizationService.createOrganization(user.id, body);
        await this.userService.updateCurrentOrganization(user.id, organization.id);
        return organization;
    }
    async updateOrganization(accessToken, body) {
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        if (!user.currentOrganization)
            throw new common_1.HttpException('Organization not found!', common_1.HttpStatus.NOT_FOUND);
        const initialOrganization = await this.organizationService.findById(user.currentOrganization);
        if (!initialOrganization.id)
            throw new common_1.HttpException('Organization not found!', common_1.HttpStatus.NOT_FOUND);
        const { id, ...paramWithoutId } = {
            ...initialOrganization,
            ...Object.fromEntries(Object.entries(body).map(([key, value]) => key in initialOrganization ? [key, value] : [])),
        };
        const param = paramWithoutId;
        const organization = await this.organizationService.updateOrganization(id, param);
        return organization;
    }
    async updateCurrentOrganization(accessToken, organizationId) {
        const decoded = await (0, decode_token_1.decodeAccessToken)(accessToken);
        const user = await this.userService.findUserById(decoded.id);
        await this.userService.updateCurrentOrganization(user.id, organizationId);
        return this.organizationService.findById(organizationId);
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "findMe", null);
__decorate([
    (0, common_1.Get)('me/all'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "findAllMe", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("authorization")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createOrganization", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateOrganization", null);
__decorate([
    (0, common_1.Put)('current-organization/:organizationId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('organizationId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateCurrentOrganization", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, common_1.Controller)('api/organization'),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService,
        users_service_1.UsersService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map