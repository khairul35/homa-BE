// Contacts.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ContactPrimaryPersons } from './ContactPrimaryPersons';
import { ContactPhoneNumber } from './ContactPhoneNumber';
import { ContactBillingAddress } from './BillingAddress';
import { ContactDeliveryAddress } from './ContactDeliveryAddress';

@Entity()
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contact_name: string;

  @Column()
  account_number: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  you_owe: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  they_owe: number;

  @Column({ type: 'enum', enum: ['Archived', 'Active', 'Inactive'] })
  status: string;

  @Column({ type: 'enum', enum: ['Customers', 'Suppliers'] })
  type: string;

  @Column()
  website: string;

  @Column()
  registration_number: string;

  @Column({ type: 'text' })
  notes: string;

  @OneToMany(() => PrimaryPersons, primaryPerson => primaryPerson.contact)
  primaryPersons: PrimaryPersons[];

  @OneToMany(() => PhoneNumber, phoneNumber => phoneNumber.contact)
  phoneNumbers: PhoneNumber[];

  @OneToOne(() => BillingAddress, billingAddress => billingAddress.contact, { nullable: true })
  @JoinColumn()
  billingAddress: BillingAddress;

  @OneToOne(() => DeliveryAddress, deliveryAddress => deliveryAddress.contact, { nullable: true })
  @JoinColumn()
  deliveryAddress: DeliveryAddress;

  @Column({ default: false })
  is_billing_same_as_deliver: boolean;
}

// PrimaryPersons.entity.ts, PhoneNumber.entity.ts, BillingAddress.entity.ts, and DeliveryAddress.entity.ts remain unchanged from the previously provided examples.
