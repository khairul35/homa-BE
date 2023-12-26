export interface OrganizationType {
    id: number;
    name: string;
    tradingName: string;
    industry: string | null;
    organizationType: string;
    registrationNumber: string | number | null;
    organizationDescription: string | null;
    postalAddress: Address;
    physicalAddress: Address;
    physicalIsPostal: boolean;
    email: string | null;
    website: string | null;
    telephone: Phone | null;
    mobile: Phone | null;
    fax: Phone | null;
    facebook: string | null;
    twitter: string | null;
    linkedin: string | null;
}
export interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string | number;
}
export interface Phone {
    countryCode: string | null;
    number: string | null;
}
export interface Props {
    detail: OrganizationType;
    error: string;
    updateDetail(detail: Partial<OrganizationType>): void;
    onBack(): void;
    onSave(): void;
    onCancel(): void;
}
