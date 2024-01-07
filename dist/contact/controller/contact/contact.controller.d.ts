import { CreateContactDto } from 'src/contact/dto/CreateContact.dto';
import { UpdateDeliveryAddressDto } from 'src/contact/dto/UpdateBillingAddress.dto';
import { UpdateBillingAddressDto } from 'src/contact/dto/UpdateDeliveryAddress.dto';
import { ContactService } from 'src/contact/services/contact/contact.service';
import { UsersService } from 'src/users/services/users/users.service';
export declare class ContactController {
    private contactService;
    private userService;
    constructor(contactService: ContactService, userService: UsersService);
    findAll(accessToken: string): Promise<any>;
    findById(contactId: number): Promise<any>;
    createContact(accessToken: string, body: CreateContactDto): Promise<any>;
    updateContact(accessToken: string, body: CreateContactDto, contactId: number): Promise<any>;
    updateBillingAddress(body: Partial<UpdateBillingAddressDto>, accessToken: string, contactId: number): Promise<any>;
    updateDeliveryAddress(body: Partial<UpdateDeliveryAddressDto>, accessToken: string, contactId: number): Promise<any>;
    deleteContact(contactId: number): Promise<string>;
}
