import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password_hash: string;

  @Column()
  email: string;

  @Column()
  account_status: string;

  @Column()
  registration_date: Date;

  @Column()
  last_login_date: Date;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column()
  current_organization: number;

  @Column({ nullable: true })
  deleted_date: Date;
}
