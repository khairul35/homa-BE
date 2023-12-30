import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Auth } from './typeorm/entities/Auth';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { Organization } from './typeorm/entities/Organization';
import { UserOrganization } from './typeorm/entities/UserOrganization';
@Module({
  imports: [
    // Configuring TypeOrm with mysql
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'Noneedpassword23!',
      database: 'Production',
      entities: [User, Auth, Organization, UserOrganization],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
