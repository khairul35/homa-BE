import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/typeorm/entities/Organization';
import { Auth } from 'src/typeorm/entities/Auth';
import { OrganizationController } from './controllers/organization/organization.controller';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { OrganizationService } from './services/organization/organization.service';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import { UserOrganization } from 'src/typeorm/entities/UserOrganization';

@Module({
    imports: [TypeOrmModule.forFeature([Organization, Auth, User, UserOrganization])],
    controllers: [OrganizationController],
    providers: [AuthService, OrganizationService, UsersService],
})
export class OrganizationModule {}
