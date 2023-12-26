"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeRefreshToken = exports.decodeAccessToken = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'i_dont_have_the_secret_key';
async function decodeAccessToken(token) {
    try {
        if (!token)
            throw new common_1.HttpException('No Access Token', common_1.HttpStatus.UNAUTHORIZED);
        const accessToken = token.split(' ')[1];
        console.log(accessToken);
        const decoded = await jwt.verify(accessToken, SECRET_KEY);
        console.log(decoded);
        return decoded;
    }
    catch (error) {
        console.log('s', error);
        throw new common_1.HttpException(error, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.decodeAccessToken = decodeAccessToken;
;
async function decodeRefreshToken(token) {
    try {
        if (!token)
            throw new common_1.HttpException('No Access Token', common_1.HttpStatus.UNAUTHORIZED);
        const decoded = await jwt.verify(token, SECRET_KEY);
        return decoded;
    }
    catch (error) {
        throw new common_1.HttpException(error, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.decodeRefreshToken = decodeRefreshToken;
//# sourceMappingURL=decode-token.js.map