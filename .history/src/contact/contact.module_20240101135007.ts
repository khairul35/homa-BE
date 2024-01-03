import { Module } from '@nestjs/common';
import { ContactController } from './controller/contact/contact.controller';
import { ContactService } from './services/contact/contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/typeorm/entities/Auth';
import { User } from 'src/typeorm/entities/User';
import { Contacts } from 'src/typeorm/entities/Contacts';
import { DeliveryAddress } from 'src/typeorm/entities/ContactDeliveryAddress';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User, Contacts, ContactDeliveryAddress])],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
