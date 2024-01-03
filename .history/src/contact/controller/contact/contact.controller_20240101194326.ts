import { Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateContactDto } from 'src/contact/dto/CreateContact.dto';
import { UpdateDeliveryAddressDto } from 'src/contact/dto/UpdateBillingAddress.dto';
import { UpdateBillingAddressDto } from 'src/contact/dto/UpdateDeliveryAddress.dto';
import { ContactService } from 'src/contact/services/contact/contact.service';
import { CreateContact } from 'src/contact/types/CreateContact';
import { UpdateContact } from 'src/contact/types/UpdateContact';
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
        if (!contactId) throw new HttpException('contactId is required', HttpStatus.BAD_REQUEST);

        const contact = await this.contactService.findContactById(contactId);
        return contact;
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

    @Put('billing-address/:contactId')
    async updateBillingAddress(
        body: Partial<UpdateBillingAddressDto>,
        @Param('contactId', ParseIntPipe) contactId: number
    ) {
        await this.contactService.createBillingAddress(contactId, body);
    }

    @Put('delivery-address/:contactId')
    async updateDeliveryAddress(
        body: Partial<UpdateDeliveryAddressDto>,
        @Param('contactId', ParseIntPipe) contactId: number
    ) {
        await this.contactService.createDeliveryAddress(contactId, body;
    }

    @Put(':contactId')
    async updateContact(
        @Headers('authorization') accessToken: string,
        body: CreateContactDto,
        @Param('contactId', ParseIntPipe) contactId: number
    ) {
        if (!contactId) throw new HttpException('contactId is required', HttpStatus.BAD_REQUEST);

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

    @Delete(':contactId')
    async deleteContact(@Param('contactId', ParseIntPipe) contactId: number) {
        if (!contactId) throw new HttpException('contactId is required', HttpStatus.BAD_REQUEST);

        await this.contactService.deleteContactById(contactId);
        return 'Contact Delete Successfully';
    };
};
