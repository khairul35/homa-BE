import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { OrganizationService } from 'src/organization/services/organization/organization.service';
import { Organization } from 'src/typeorm/entities/Organization';
import { UserOrganization } from 'src/typeorm/entities/UserOrganization';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, UserOrganization])],
  controllers: [UsersController],
  providers: [UsersService, OrganizationService],
})
export class UsersModule {}
