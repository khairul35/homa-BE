// Contacts.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ContactPrimaryPersons } from './ContactPrimaryPersons';
import { ContactPhoneNumber } from './ContactPhoneNumber';
import { ContactBillingAddress } from './ContactBillingAddress';
import { ContactDeliveryAddress } from './ContactDeliveryAddress';

@Entity({ name: 'Contacts' })
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

  @Column({ type: 'datetime', nullable: true })
  deletedDate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'text' })
  notes: string;

  @OneToMany(() => ContactPrimaryPersons, primaryPerson => primaryPerson.contact)
  contactPrimaryPersons: ContactPrimaryPersons[];

  @OneToMany(() => ContactPhoneNumber, phoneNumber => phoneNumber.contact)
  contactPhoneNumber: ContactPhoneNumber[];

  @OneToOne(() => ContactBillingAddress, billingAddress => billingAddress.contact, { nullable: true })
  @JoinColumn()
  contactBillingAddress: ContactBillingAddress;

  @OneToOne(() => ContactDeliveryAddress, deliveryAddress => deliveryAddress.contact, { nullable: true })
  @JoinColumn()
  contactDeliveryAddress: ContactDeliveryAddress;

  @Column({ default: false })
  is_billing_same_as_deliver: boolean;

  @Column()
  organization_id: number;
}

// PrimaryPersons.entity.ts, PhoneNumber.entity.ts, BillingAddress.entity.ts, and DeliveryAddress.entity.ts remain unchanged from the previously provided examples.
