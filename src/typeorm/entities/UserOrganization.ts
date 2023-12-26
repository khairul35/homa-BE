import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'UserOrganization' })
export class UserOrganization {
        @PrimaryGeneratedColumn({ type: 'bigint' })
        id: number;

        @Column()
        user_id: number;

        @Column()
        organization_id: number;

        @Column()
        role_id: number;
}
