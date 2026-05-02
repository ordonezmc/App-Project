import * as jwt from 'jsonwebtoken';

export class JwtService {
  private secret = 'supersecret';

  generateToken(payload: any) {
    return jwt.sign(payload, this.secret, { expiresIn: '7d' });
  }
}
