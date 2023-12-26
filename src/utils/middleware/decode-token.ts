import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = 'i_dont_have_the_secret_key';

interface DecodedToken {
  id: number;
  username: string;
  email: string;
  role: string;
  accountStatus: string;
  firstName: string;
  lastName: string;
  lastLoginDate: number;
}

interface DecodedRefreshToken {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  lastLoginDate: number;
  accessToken?: string; // The accessToken property is optional
}

export async function decodeAccessToken(token: string): Promise<DecodedToken> {
    try {
        if (!token) throw new HttpException('No Access Token', HttpStatus.UNAUTHORIZED);
        const accessToken = token.split(' ')[1];
        console.log(accessToken);
        const decoded: DecodedToken | any = await jwt.verify(accessToken, SECRET_KEY);
        console.log(decoded)
        return decoded;
    } catch (error) {
        console.log('s', error)
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
};

export async function decodeRefreshToken(token: string): Promise<DecodedRefreshToken> {
    try {
        if (!token) throw new HttpException('No Access Token', HttpStatus.UNAUTHORIZED)
        const decoded: DecodedToken | any = await jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
}
