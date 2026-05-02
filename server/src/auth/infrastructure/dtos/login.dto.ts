import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {

  @IsEmail()
  email!: string;

  @IsNotEmpty({message: 'Debe ingresar una contraseña'})
  password!: string;
}