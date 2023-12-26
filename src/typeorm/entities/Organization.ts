import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Organization' })
export class Organization {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  trading_name: string;

  @Column()
  industry: string;

  @Column()
  organization_type: string;

  @Column()
  registration_number: string;

  @Column()
  organization_description: string;


  /** Postal Address ********************************************/
  @Column()
  postal_address_line1: string;

  @Column()
  postal_address_line2: string;

  @Column()
  postal_address_city: string;

  @Column()
  postal_address_state: string;

  @Column()
  postal_address_postal_code: string

  /** Physical Address ********************************************/
  @Column()
  physical_address_line1: string;

  @Column()
  physical_address_line2: string;

  @Column()
  physical_address_city: string;

  @Column()
  physical_address_state: string;

  @Column()
  physical_address_postal_code: string;

  @Column()
  physical_is_postal: boolean;

  @Column()
  email: string;

  @Column()
  website: string;

  @Column()
  facebook: string;

  @Column()
  twitter: string;

  @Column()
  linkedin: string;

  @Column()
  telephone_country_code: string;

  @Column()
  telephone_number: string;

  @Column()
  fax_country_code: string;

  @Column()
  fax_number: string;

  @Column()
  mobile_country_code: string;

  @Column()
  mobile_number: string;
}