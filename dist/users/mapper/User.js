"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const UserMapper = (data) => {
    return {
        id: data?.id || null,
        registrationDate: data?.registration_date || null,
        lastLoginDate: data?.last_login_date || null,
        username: data?.username || null,
        hashedPassword: data?.password_hash || null,
        email: data?.email || null,
        roleId: data?.role_role || null,
        role: getRole(data?.role_id || null),
        accountStatus: data?.account_status || null,
        firstName: data?.first_name || null,
        lastName: data?.last_name || null,
        phoneNumber: data?.phone_number || null,
        currentOrganization: data?.current_organization || null,
    };
};
exports.UserMapper = UserMapper;
const getRole = (role) => {
    if (role == 1)
        return 'Customer Service';
    if (role == 2)
        return 'Sales Person';
    if (role == 3)
        return 'Outlet Manager';
    if (role == 4)
        return 'Head of Sales';
    if (role == 5)
        return 'Super Admin';
    return null;
};
//# sourceMappingURL=User.js.map