import { Controller, Get, Headers, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateContactDto } from 'src/contact/dto/CreateContact.dto';
import { ContactService } from 'src/contact/services/contact/contact.service';
import { CreateContact } from 'src/contact/types/CreateContact';
import { UpdateContact } from 'src/contact/types/UpdateContact';
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
    };

    @Get(':contactId')
    async findById(@Param('contactId', ParseIntPipe) contactId: number) {
        const contact = await this.contactService.findContactById(contactId);
    };

    @Post()
    async createContact(@Headers('authorization') accessToken: string, body: CreateContactDto) {
        /** Find Current User */
        const decoded = await decodeAccessToken(accessToken);
        const user = await this.userService.findUserById(decoded.id);

        const createContactParam: Partial<CreateContact> = {
            contactName: body?.contactName,
            accountNumber: body?.accountNumber,
            youOwe: body?.youOwe,
            theyOwe: body?.theyOwe,
            status: body?.status,
            type: body?.type,
            website: body?.website,
            registrationNumber: body?.registrationNumber,
            notes: body?.notes,
            isBillingSameAsDelivery: body?.isBillingSameAsDelivery,
            organizationId: user?.currentOrganization,
        };
        const contact = await this.contactService.createContact(createContactParam);
        await this.contactService.createContactPhoneNumber(contact?.id, body?.contactPhoneNumber);
        await this.contactService.createContactPrimaryPersons(contact?.id, body?.contactPrimaryPerson);
        return await this.contactService.findContactById(contact?.id);
    };

    @Put(':contactId')
    async updateContact(
        @Headers('authorization') accessToken: string,
        body: CreateContactDto,
        @Param('contactId', ParseIntPipe) contactId: number
    ) {
        /** Find Current User */
        const decoded = await decodeAccessToken(accessToken);
        const user = await this.userService.findUserById(decoded.id);

        const updateContactParam: Partial<UpdateContact> = {
            contactName: body?.contactName,
            accountNumber: body?.accountNumber,
            youOwe: body?.youOwe,
            theyOwe: body?.theyOwe,
            status: body?.status,
            type: body?.type,
            website: body?.website,
            registrationNumber: body?.registrationNumber,
            notes: body?.notes,
            isBillingSameAsDelivery: body?.isBillingSameAsDelivery,
            organizationId: user?.currentOrganization,
        };
        const contact = await this.contactService.updateContact(contactId, updateContactParam);
        await this.contactService.createContactPhoneNumber(contact?.id, body?.contactPhoneNumber);
        await this.contactService.createContactPrimaryPersons(contact?.id, body?.contactPrimaryPerson);
        return await this.contactService.findContactById(contact?.id);
    };
};
