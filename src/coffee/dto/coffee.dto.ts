import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  flavours: String[];

  @IsArray()
  @IsString({ each: true })
  ingredients: String[];
}
