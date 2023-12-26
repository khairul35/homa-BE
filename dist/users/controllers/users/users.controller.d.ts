import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { OrganizationService } from 'src/organization/services/organization/organization.service';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
export declare class UsersController {
    private userService;
    private organizationService;
    constructor(userService: UsersService, organizationService: OrganizationService);
    getUsers(accessToken: string): Promise<{
        id: any;
        registrationDate: any;
        lastLoginDate: any;
        username: any;
        hashedPassword: any;
        email: any;
        roleId: any;
        role: string;
        accountStatus: any;
        firstName: any;
        lastName: any;
        phoneNumber: any;
        currentOrganization: any;
    }[]>;
    getUserById(id: number): Promise<{
        id: any;
        registrationDate: any;
        lastLoginDate: any;
        username: any;
        hashedPassword: any;
        email: any;
        roleId: any;
        role: string;
        accountStatus: any;
        firstName: any;
        lastName: any;
        phoneNumber: any;
        currentOrganization: any;
    }>;
    createUser(accessToken: string, createUserDto: CreateUserDto): Promise<{
        id: any;
        registrationDate: any;
        lastLoginDate: any;
        username: any;
        hashedPassword: any;
        email: any;
        roleId: any;
        role: string;
        accountStatus: any;
        firstName: any;
        lastName: any;
        phoneNumber: any;
        currentOrganization: any;
    }>;
    updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: any;
        registrationDate: any;
        lastLoginDate: any;
        username: any;
        hashedPassword: any;
        email: any;
        roleId: any;
        role: string;
        accountStatus: any;
        firstName: any;
        lastName: any;
        phoneNumber: any;
        currentOrganization: any;
    }>;
    deleteUserById(id: number): Promise<import("typeorm").UpdateResult>;
}
