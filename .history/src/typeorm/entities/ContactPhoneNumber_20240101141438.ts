// PhoneNumber.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contacts } from './Contacts';

@Entity({ name: 'ContactPhoneNumber' })
export class ContactPhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country_code: string;

  @Column()
  number: string;

  @ManyToOne(() => Contacts, contact => contact.phoneNumbers)
  contact: Contacts;
}
