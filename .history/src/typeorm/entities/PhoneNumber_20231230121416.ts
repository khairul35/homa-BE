// PhoneNumber.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contacts } from './Contacts.entity';

@Entity()
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country_code: string;

  @Column()
  number: string;

  @ManyToOne(() => Contacts, contact => contact.phoneNumbers)
  contact: Contacts;
}
