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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const typeorm_1 = require("typeorm");
let Organization = class Organization {
};
exports.Organization = Organization;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Organization.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "trading_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "industry", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "organization_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "registration_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "organization_description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "postal_address_line1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "postal_address_line2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "postal_address_city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "postal_address_state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "postal_address_postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "physical_address_line1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "physical_address_line2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "physical_address_city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "physical_address_state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "physical_address_postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Organization.prototype, "physical_is_postal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "facebook", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "twitter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "linkedin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "telephone_country_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "telephone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "fax_country_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "fax_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "mobile_country_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organization.prototype, "mobile_number", void 0);
exports.Organization = Organization = __decorate([
    (0, typeorm_1.Entity)({ name: 'Organization' })
], Organization);
//# sourceMappingURL=Organization.js.map