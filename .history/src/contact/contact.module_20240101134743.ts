import { Module } from '@nestjs/common';
import { ContactController } from './controller/contact/contact.controller';
import { ContactService } from './services/contact/contact.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
