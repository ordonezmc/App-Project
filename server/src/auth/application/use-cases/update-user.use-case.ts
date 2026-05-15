import { User } from "src/auth/domain/entities/user.entity";
import { UserRepository } from "src/auth/domain/repositories/user.repository";
import { UpdateUserDto } from "src/auth/infrastructure/dtos/update-user.dto";

export class UpdateUserUseCase {
  constructor(private userRepo: UserRepository) {}
  async execute(id: string, data: UpdateUserDto): Promise<User>{
    const updatedUser: Partial<User> = {
        name: data.name,
        email: data.email,
        passwordHash: data.password
    }
    return await this.userRepo.update(id, updatedUser)
  }
}