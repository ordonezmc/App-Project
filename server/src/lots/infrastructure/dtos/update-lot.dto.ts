import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateLoteDTO {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  hectareas?: number;

  @IsOptional()
  @IsNumber()
  temperatura_min?: number;

  @IsOptional()
  @IsNumber()
  temperatura_max?: number;

  @IsOptional()
  @IsNumber()
  numero_plantas?: number;
}
