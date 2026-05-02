import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../domain/repositories/user.repository';

export class LoginUseCase {
  constructor(
    private userRepo: UserRepository,
    private jwtService: any,
  ) {}

  async execute(data: any) {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) throw new Error('Invalid user');

    const match = await bcrypt.compare(data.password, user.passwordHash);

    if (!match) throw new Error('Invalid password');

    const token = this.jwtService.generateToken({
      userId: user.id,
      email: user.email,
    });

    return { token };
  }
}
