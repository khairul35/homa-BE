import { Controller, Get, Headers, Param, ParseIntPipe } from '@nestjs/common';
import { ContactService } from 'src/contact/services/contact/contact.service';
import { OrganizationService } from 'src/organization/services/organization/organization.service';
import { UsersService } from 'src/users/services/users/users.service';
import { decodeAccessToken } from 'src/utils/middleware/decode-token';

@Controller('contact')
export class ContactController {
    constructor(
        private contactService: ContactService,
        private userService: UsersService,
    ) {}

    @Get('')
    async findAll(@Headers('authorization') accessToken: string) {
        /** Find Current User */
        const decoded = await decodeAccessToken(accessToken);
        const user = await this.userService.findUserById(decoded.id);

        if (!user?.currentOrganization) return [];
        const contacts = await this.contactService.findAllContact(user.currentOrganization);
        return contacts;
    }

    @Get(':contactId')
    async findById(@Param('contactId', ParseIntPipe) contactId: number) {
        const contact = await this.contactService.findContactById(contactId);
    }
}
