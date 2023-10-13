import { Injectable } from '@nestjs/common';
import * as cryptojs from 'crypto-js';
@Injectable()
export class AuthService {
  public signIn(inputPassword: string, accountPassword: string): Promise<null> {
    const passwordBytes = cryptojs.AES.decrypt(
      accountPassword,
      process.env.ACCOUNT_SECRET_KEY,
    );

    const passwordDecrypt = passwordBytes.toString(cryptojs.enc.Utf8);

    if (inputPassword !== passwordDecrypt) {
      const error: any = new Error();
      error.errorCode = 400;
      error.errorInfo = 'Password tidak sesuai';

      throw error;
    }

    return;
  }
}
