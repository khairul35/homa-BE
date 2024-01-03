// PrimaryPersons.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contacts } from './Contacts';

@Entity({ name: 'ContactPrimaryPersons' })
export class ContactPrimaryPersons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @ManyToOne(() => Contacts, contact => contact.contactPrimaryPersons)
  contact: Contacts;
}
