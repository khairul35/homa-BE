"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.underscoreToCamelCase = void 0;
const underscoreToCamelCase = (data) => {
    if (!data) {
        return null;
    }
    if (Array.isArray(data)) {
        return data.map((item) => transformKeys(item));
    }
    return transformKeys(data);
};
exports.underscoreToCamelCase = underscoreToCamelCase;
const transformKeys = (item) => {
    const transformedItem = {};
    Object.keys(item).forEach(key => {
        const transformedKey = key.replace(/_([a-z])/g, (match, group) => group.toUpperCase());
        if (Array.isArray(item[key])) {
            transformedItem[transformedKey] = (0, exports.underscoreToCamelCase)(item[key]);
        }
        else if (typeof item[key] === 'object' && item[key] !== null) {
            transformedItem[transformedKey] = transformKeys(item[key]);
        }
        else {
            transformedItem[transformedKey] = item[key];
        }
    });
    return transformedItem;
};
//# sourceMappingURL=underscoreToCamelCase.js.map