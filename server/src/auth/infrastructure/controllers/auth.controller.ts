import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterDTO } from '../dtos/register.dto';
import { LoginDTO } from '../dtos/login.dto';
<<<<<<< Updated upstream
import path from 'node:path';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserUseCase } from 'src/auth/application/use-cases/update-user.use-case';
=======
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
>>>>>>> Stashed changes

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente',
  })
  register(@Body() body: RegisterDTO) {
    return this.registerUseCase.execute(body);
  }

  @ApiOperation({
    summary: 'Login de usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario logueado correctamente',
  })
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
