"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationMapper = void 0;
const OrganizationMapper = (data) => {
    return {
        id: data?.id || null,
        name: data?.name || null,
        tradingName: data?.trading_name || null,
        industry: data?.industry || null,
        organizationType: data?.organization_type || null,
        registrationNumber: data?.registration_number || null,
        organizationDescription: data?.organization_description || null,
        postalAddress: {
            addressLine1: data?.postal_address_line1 || null,
            addressLine2: data?.postal_address_line2 || null,
            city: data?.postal_address_city || null,
            state: data?.postal_address_state || null,
            postalCode: data?.postal_address_postal_code || null,
        },
        physicalAddress: {
            addressLine1: data?.physical_address_line1 || null,
            addressLine2: data?.physical_address_line2 || null,
            city: data?.physical_address_city || null,
            state: data?.physical_address_state || null,
            postalCode: data?.physical_address_postal_code || null,
        },
        physicalIsPostal: data?.physical_is_postal || false,
        email: data?.email || null,
        website: data?.website || null,
        facebook: data?.facebook || null,
        twitter: data?.twitter || null,
        linkedin: data?.linkedin || null,
        telephone: {
            countryCode: data?.telephone_country_code || null,
            number: data?.telephone_number || null,
        },
        fax: {
            countryCode: data?.fax_country_code || null,
            number: data?.fax_number || null,
        },
        mobile: {
            countryCode: data?.mobile_country_code || null,
            number: data?.mobile_number || null,
        },
    };
};
exports.OrganizationMapper = OrganizationMapper;
//# sourceMappingURL=Organization.js.map