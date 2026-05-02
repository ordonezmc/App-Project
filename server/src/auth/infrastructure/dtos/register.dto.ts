import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({message: 'El nombre no debe estar vacio'})
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}
