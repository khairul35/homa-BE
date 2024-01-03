// BillingAddress.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Contacts } from './Contacts';

@Entity()
export class BillingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attention: string;

  @Column()
  address_line_1: string;

  @Column()
  address_line_2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postal_code: string;

  @Column()
  country: string;

  @OneToOne(() => Contacts, contact => contact.billingAddress)
  @JoinColumn()
  contact: Contacts;
}
