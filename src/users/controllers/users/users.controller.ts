import {
  Headers,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { OrganizationService } from 'src/organization/services/organization/organization.service';
import { hash } from 'bcrypt';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';
import { decodeAccessToken } from 'src/utils/middleware/decode-token';

@Controller('api/user')
export class UsersController {
  constructor(
    private userService: UsersService,
    private organizationService: OrganizationService
  ) {}

  @Get()
  async getUsers(@Headers('authorization') accessToken: string) {
    /** Find Current User */
    const decoded = await decodeAccessToken(accessToken);
    const user = await this.userService.findUserById(decoded.id);
  
    const users = await this.userService.findUsers(user.currentOrganization);
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findUserById(id);
  }

  @Post()
  async createUser(@Headers('authorization') accessToken: string, @Body() createUserDto: CreateUserDto) {
      /** Find Current User */
    const decoded = await decodeAccessToken(accessToken);
    const user = await this.userService.findUserById(decoded.id);

    /** process hashed password with using bcrypt */
    const salt = 10;
    const hashedPassword = await hash(createUserDto.password, salt);

    /** Add all processed data into params and map data correctly */
    const params = {
      username: createUserDto.username,
      password_hash: hashedPassword,
      email: createUserDto.email,
      account_status: 'active',
      registration_date: new Date(),
      last_login_date: null,
      first_name: createUserDto.firstName,
      last_name: createUserDto.lastName,
      phone_number: createUserDto.phoneNumber,
      current_organization: user.currentOrganization,
    };

    const res = await this.userService.createUser(params);
    await this.organizationService.assignOrganizationToUser(res.id, user.currentOrganization, createUserDto.roleId);
    return res;
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    /** Add all processed data into params and map data correctly */
    const params = {
      username: updateUserDto.username,
      email: updateUserDto.email,
      first_name: updateUserDto.firstName,
      last_name: updateUserDto.lastName,
      phone_number: updateUserDto.phoneNumber,
    };

    return await this.userService.updateUser(id, params);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
