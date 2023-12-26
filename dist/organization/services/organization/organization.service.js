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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Organization_1 = require("../../mapper/Organization");
const Organization_2 = require("../../../typeorm/entities/Organization");
const UserOrganization_1 = require("../../../typeorm/entities/UserOrganization");
const typeorm_2 = require("typeorm");
let OrganizationService = class OrganizationService {
    constructor(OrganizationRepository, UserOrganizationRepository) {
        this.OrganizationRepository = OrganizationRepository;
        this.UserOrganizationRepository = UserOrganizationRepository;
    }
    async findById(id) {
        return (0, Organization_1.OrganizationMapper)(await this.OrganizationRepository.findOne({
            where: { id },
        }));
    }
    ;
    async findOrganizationsByUserId(userId) {
        const userOrganizations = await this.UserOrganizationRepository.find({
            where: { user_id: userId },
        });
        const organizationIds = userOrganizations.map(userOrg => userOrg.organization_id);
        const organizations = await this.OrganizationRepository.findByIds(organizationIds);
        return organizations.map(Organization_1.OrganizationMapper);
    }
    async updateOrganization(id, body) {
        await this.OrganizationRepository.update({ id }, {
            name: body?.name || '',
            trading_name: body?.tradingName || '',
            industry: body?.industry || '',
            organization_type: body?.organizationType || '',
            registration_number: `${body?.registrationNumber || ''}`,
            organization_description: body?.organizationDescription || '',
            postal_address_line1: body?.postalAddress.addressLine1 || '',
            postal_address_line2: body?.postalAddress.addressLine2 || '',
            postal_address_city: body?.postalAddress.city || '',
            postal_address_state: body?.postalAddress.state || '',
            postal_address_postal_code: `${body?.postalAddress?.postalCode || ''}`,
            physical_address_line1: body?.physicalAddress?.addressLine1 || '',
            physical_address_line2: body?.physicalAddress?.addressLine2 || '',
            physical_address_city: body?.physicalAddress?.city || '',
            physical_address_state: body?.physicalAddress?.state || '',
            physical_address_postal_code: `${body?.physicalAddress?.postalCode || ''}`,
            physical_is_postal: body?.physicalIsPostal || false,
            email: body?.email || '',
            website: body?.website || '',
            facebook: body?.facebook || '',
            twitter: body?.twitter || '',
            linkedin: body?.linkedin || '',
            telephone_country_code: body?.telephone?.countryCode || '',
            telephone_number: body?.telephone?.number || '',
            fax_country_code: body?.fax?.countryCode || '',
            fax_number: body?.fax?.number || '',
            mobile_country_code: body?.mobile?.countryCode || '',
            mobile_number: body?.mobile?.number || '',
        });
        return this.findById(id);
    }
    ;
    async createOrganization(userId, body) {
        const newOrganization = this.OrganizationRepository.create({
            name: body?.name || '',
            trading_name: body?.tradingName || '',
            industry: body?.industry || '',
            organization_type: body?.organizationType || '',
            registration_number: `${body?.registrationNumber || ''}`,
            organization_description: body?.organizationDescription || '',
            postal_address_line1: body?.postalAddress.addressLine1 || '',
            postal_address_line2: body?.postalAddress.addressLine2 || '',
            postal_address_city: body?.postalAddress.city || '',
            postal_address_state: body?.postalAddress.state || '',
            postal_address_postal_code: `${body?.postalAddress?.postalCode || ''}`,
            physical_address_line1: body?.physicalAddress?.addressLine1 || '',
            physical_address_line2: body?.physicalAddress?.addressLine2 || '',
            physical_address_city: body?.physicalAddress?.city || '',
            physical_address_state: body?.physicalAddress?.state || '',
            physical_address_postal_code: `${body?.physicalAddress?.postalCode || ''}`,
            physical_is_postal: body?.physicalIsPostal || false,
            email: body?.email || '',
            website: body?.website || '',
            facebook: body?.facebook || '',
            twitter: body?.twitter || '',
            linkedin: body?.linkedin || '',
            telephone_country_code: body?.telephone?.countryCode || '',
            telephone_number: body?.telephone?.number || '',
            fax_country_code: body?.fax?.countryCode || '',
            fax_number: body?.fax?.number || '',
            mobile_country_code: body?.mobile?.countryCode || '',
            mobile_number: body?.mobile?.number || '',
        });
        const { id } = await this.OrganizationRepository.save(newOrganization);
        await this.UserOrganizationRepository.insert({ organization_id: id, user_id: userId });
        return this.findById(id);
    }
    ;
    async assignOrganizationToUser(userId, organizationId, roleId) {
        await this.UserOrganizationRepository.delete({ user_id: userId, organization_id: organizationId });
        const res = await this.UserOrganizationRepository.insert({
            organization_id: organizationId,
            user_id: userId,
            role_id: roleId,
        });
        return res;
    }
    ;
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Organization_2.Organization)),
    __param(1, (0, typeorm_1.InjectRepository)(UserOrganization_1.UserOrganization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map