import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationDto } from 'src/organization/dto/CreateOrganization.dto';
import { updateOrganizationDto } from 'src/organization/dto/UpdateOrganization.dto';
import { OrganizationMapper } from 'src/organization/mapper/Organization';
import { OrganizationType } from 'src/organization/types/OrganizationType';
import { Organization } from 'src/typeorm/entities/Organization';
import { UserOrganization } from 'src/typeorm/entities/UserOrganization';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private OrganizationRepository: Repository<Organization>,
        @InjectRepository(UserOrganization)
        private UserOrganizationRepository: Repository<UserOrganization>
    ) {}

    async findById(id: number): Promise<OrganizationType> {
        return OrganizationMapper(await this.OrganizationRepository.findOne(
            {
                where: { id },
            }
        ))
    };
    
    async findOrganizationsByUserId(userId: number): Promise<OrganizationType[]> {
    const userOrganizations = await this.UserOrganizationRepository.find({
        where: { user_id: userId }, // Find all records where user_id matches the provided userId
    });

    const organizationIds = userOrganizations.map(userOrg => userOrg.organization_id);

    // Assuming this.OrganizationRepository.find() fetches organizations based on their IDs
    const organizations = await this.OrganizationRepository.findByIds(organizationIds);

    return organizations.map(OrganizationMapper);
}

    async updateOrganization(id: number, body: updateOrganizationDto): Promise<OrganizationType> {
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
    };

    async createOrganization(userId: number, body: Partial<CreateOrganizationDto>): Promise<OrganizationType> {
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
        await this.UserOrganizationRepository.insert({ organization_id: id, user_id: userId })
        return this.findById(id);
    };

    async assignOrganizationToUser(userId: number, organizationId: number, roleId: number | null) {
        await this.UserOrganizationRepository.delete({ user_id: userId, organization_id: organizationId });
        const res = await this.UserOrganizationRepository.insert({
            organization_id: organizationId,
            user_id: userId,
            role_id: roleId,
        });
        return res;
    };
}
