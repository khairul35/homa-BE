import { CreateOrganizationDto } from 'src/organization/dto/CreateOrganization.dto';
import { updateOrganizationDto } from 'src/organization/dto/UpdateOrganization.dto';
import { OrganizationService } from 'src/organization/services/organization/organization.service';
import { OrganizationType } from 'src/organization/types/OrganizationType';
import { UsersService } from 'src/users/services/users/users.service';
export declare class OrganizationController {
    private organizationService;
    private userService;
    constructor(organizationService: OrganizationService, userService: UsersService);
    findMe(accessToken: string): Promise<OrganizationType>;
    findAllMe(accessToken: string): Promise<OrganizationType[]>;
    createOrganization(accessToken: string, body: Partial<CreateOrganizationDto>): Promise<OrganizationType>;
    updateOrganization(accessToken: string, body: Partial<updateOrganizationDto>): Promise<OrganizationType>;
    updateCurrentOrganization(accessToken: string, organizationId: number): Promise<OrganizationType>;
}
