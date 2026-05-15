import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterDTO } from '../dtos/register.dto';
import { LoginDTO } from '../dtos/login.dto';
import path from 'node:path';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserUseCase } from 'src/auth/application/use-cases/update-user.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.registerUseCase.execute(body);
  }

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.loginUseCase.execute(body);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.updateUserUseCase.execute(id, updateUserDto);
  }
}
