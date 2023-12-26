import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { UserMapper } from '../../mapper/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async findUsers(orgId: number) {
    const users = await this.UserRepository
    .createQueryBuilder('u')
    .select('u.*')
    .addSelect('uo.role_id')
    .innerJoin('UserOrganization', 'uo', 'uo.user_id = u.id AND uo.organization_id = :orgId', { orgId })
    .where('u.deleted_date IS NULL')
    .getRawMany();
    return users.map(user => UserMapper(user));
  }


  async findUserById(id: number) {
    return UserMapper(await this.UserRepository.findOne({ where: { id, deleted_date: null } }));
  }

  async findUserByUsername(username: string) {
    return UserMapper(await this.UserRepository.findOne({ where: { username, deleted_date: null } }));
  }

  async createUser(userDetails: CreateUserParams) {
    const newUser = this.UserRepository.create({ ...userDetails });
    const { id } = await this.UserRepository.save(newUser);
    return await this.findUserById(id);
  }

  async updateUser(id: number, userDetails: UpdateUserParams) {
    await this.UserRepository.update({ id }, { ...userDetails });
    return await this.findUserById(id);
  }

  async updateCurrentOrganization(id: number, organizationId: number) {
    const updatedUser = this.UserRepository.update({ id }, { current_organization: organizationId });
    return await this.findUserById(id);
  }

  deleteUser(id: number) {
    /** Soft Delete */
    return this.UserRepository.update({ id }, { deleted_date: new Date() });
  }
}
