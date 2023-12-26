import { CreateOrganizationDto } from 'src/organization/dto/CreateOrganization.dto';
import { updateOrganizationDto } from 'src/organization/dto/UpdateOrganization.dto';
import { OrganizationType } from 'src/organization/types/OrganizationType';
import { Organization } from 'src/typeorm/entities/Organization';
import { UserOrganization } from 'src/typeorm/entities/UserOrganization';
import { Repository } from 'typeorm';
export declare class OrganizationService {
    private OrganizationRepository;
    private UserOrganizationRepository;
    constructor(OrganizationRepository: Repository<Organization>, UserOrganizationRepository: Repository<UserOrganization>);
    findById(id: number): Promise<OrganizationType>;
    findOrganizationsByUserId(userId: number): Promise<OrganizationType[]>;
    updateOrganization(id: number, body: updateOrganizationDto): Promise<OrganizationType>;
    createOrganization(userId: number, body: Partial<CreateOrganizationDto>): Promise<OrganizationType>;
    assignOrganizationToUser(userId: number, organizationId: number, roleId: number | null): Promise<import("typeorm").InsertResult>;
}
