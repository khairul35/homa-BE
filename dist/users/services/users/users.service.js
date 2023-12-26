"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../../typeorm/entities/User");
const typeorm_2 = require("typeorm");
const User_2 = require("../../mapper/User");
let UsersService = class UsersService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async findUsers(orgId) {
        const users = await this.UserRepository
            .createQueryBuilder('u')
            .select('u.*')
            .addSelect('uo.role_id')
            .innerJoin('UserOrganization', 'uo', 'uo.user_id = u.id AND uo.organization_id = :orgId', { orgId })
            .where('u.deleted_date IS NULL')
            .getRawMany();
        return users.map(user => (0, User_2.UserMapper)(user));
    }
    async findUserById(id) {
        return (0, User_2.UserMapper)(await this.UserRepository.findOne({ where: { id, deleted_date: null } }));
    }
    async findUserByUsername(username) {
        return (0, User_2.UserMapper)(await this.UserRepository.findOne({ where: { username, deleted_date: null } }));
    }
    async createUser(userDetails) {
        const newUser = this.UserRepository.create({ ...userDetails });
        const { id } = await this.UserRepository.save(newUser);
        return await this.findUserById(id);
    }
    async updateUser(id, userDetails) {
        await this.UserRepository.update({ id }, { ...userDetails });
        return await this.findUserById(id);
    }
    async updateCurrentOrganization(id, organizationId) {
        const updatedUser = this.UserRepository.update({ id }, { current_organization: organizationId });
        return await this.findUserById(id);
    }
    deleteUser(id) {
        return this.UserRepository.update({ id }, { deleted_date: new Date() });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map