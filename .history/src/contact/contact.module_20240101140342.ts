import { Module } from '@nestjs/common';
import { ContactController } from './controller/contact/contact.controller';
import { ContactService } from './services/contact/contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/typeorm/entities/Auth';
import { User } from 'src/typeorm/entities/User';
import { Contacts } from 'src/typeorm/entities/Contacts';
import { ContactDeliveryAddress } from 'src/typeorm/entities/ContactDeliveryAddress';
import { ContactBillingAddress } from 'src/typeorm/entities/ContactBillingAddress';
import { ContactPhoneNumber } from 'src/typeorm/entities/ContactPhoneNumber';
import { ContactPrimaryPersons } from 'src/typeorm/entities/ContactPrimaryPersons';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User, Contacts, ContactDeliveryAddress, ContactBillingAddress, ContactPhoneNumber, ContactPrimaryPersons])],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
