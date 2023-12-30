// PrimaryPersons.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contacts } from './Contacts';

@Entity()
export class PrimaryPersons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @ManyToOne(() => Contacts, contact => contact.primaryPersons)
  contact: Contacts;
}
