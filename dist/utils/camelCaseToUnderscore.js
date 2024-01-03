"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCaseToUnderscore = void 0;
const camelCaseToUnderscore = (data) => {
    if (!data) {
        return null;
    }
    if (Array.isArray(data)) {
        return data.map(item => (0, exports.camelCaseToUnderscore)(item));
    }
    if (typeof data === 'object') {
        const underscoredData = {};
        Object.keys(data).forEach(key => {
            const underscoreKey = key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
            underscoredData[underscoreKey] = (0, exports.camelCaseToUnderscore)(data[key]);
        });
        return underscoredData;
    }
    return data;
};
exports.camelCaseToUnderscore = camelCaseToUnderscore;
//# sourceMappingURL=camelCaseToUnderscore.js.map