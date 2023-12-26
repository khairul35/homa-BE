import {
    Controller,
    Get,
    Headers,
    HttpException,
    HttpStatus,
    Post,
    Body,
    Put,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { CreateOrganizationDto } from 'src/organization/dto/CreateOrganization.dto';
import { updateOrganizationDto } from 'src/organization/dto/UpdateOrganization.dto';
import { OrganizationService } from 'src/organization/services/organization/organization.service';
import { OrganizationType } from 'src/organization/types/OrganizationType';
import { UsersService } from 'src/users/services/users/users.service';
import { decodeAccessToken } from 'src/utils/middleware/decode-token';

@Controller('api/organization')
export class OrganizationController {
    constructor(
        private organizationService: OrganizationService,
        private userService: UsersService,
    ) {}

    @Get('me')
    async findMe(@Headers('authorization') accessToken: string) {
        /** Find Current User */
        const decoded = await decodeAccessToken(accessToken);
        const user = await this.userService.findUserById(decoded.id);

        /** Use the current user data to get the current organization ID */
        const organization = await this.organizationService.findById(user.currentOrganization);
        return organization;
    }

    @Get('me/all')
    async findAllMe(@Headers('authorization') accessToken: string) {
        /** Find Current User */
        const decoded = await decodeAccessToken(accessToken);
        const user = await this.userService.findUserById(decoded.id);

        const organizations = await this.organizationService.findOrganizationsByUserId(user.id);
        return organizations;
    }

    @Post()
    async createOrganization(
        @Headers("authorization") accessToken: string,
        @Body() body: Partial<CreateOrganizationDto>
    ) {
        /** Find Current User */
        const decoded = await decodeAccessToken(accessToken);
        const user = await this.userService.findUserById(decoded.id);

        /** Insert data into database then assign it as the new current organization */
        const organization = await this.organizationService.createOrganization(user.id, body);
        await this.userService.updateCurrentOrganization(user.id, organization.id);
        return organization;
    }

    @Put()
    async updateOrganization(
        @Headers('authorization') accessToken: string,
        @Body() body: Partial<updateOrganizationDto>
    ) {
        /** Find Current User */
        const decoded = await decodeAccessToken(accessToken);
        const user = await this.userService.findUserById(decoded.id);

        if (!user.currentOrganization) throw new HttpException('Organization not found!', HttpStatus.NOT_FOUND);

        /** Find organization Detail and check the existence */
        const initialOrganization = await this.organizationService.findById(user.currentOrganization);
        if (!initialOrganization.id) throw new HttpException('Organization not found!', HttpStatus.NOT_FOUND);

        /** Process Parameter with the updated one and save into database */
        const { id, ...paramWithoutId }: OrganizationType = {
            ...initialOrganization,
            ...Object.fromEntries(
                Object.entries(body).map(([key, value]) =>
                    key in initialOrganization ? [key, value] : []
                )
            ),
        };
        const param: updateOrganizationDto = paramWithoutId;
        const organization = await this.organizationService.updateOrganization(id, param);
        return organization;
    }

    @Put('current-organization/:organizationId')
    async updateCurrentOrganization(
        @Headers('authorization') accessToken: string,
        @Param('organizationId', ParseIntPipe) organizationId: number
    ) {
        /** Find Current User */
        const decoded = await decodeAccessToken(accessToken);
        const user = await this.userService.findUserById(decoded.id);

        await this.userService.updateCurrentOrganization(user.id, organizationId);
        return this.organizationService.findById(organizationId);
    }
}
