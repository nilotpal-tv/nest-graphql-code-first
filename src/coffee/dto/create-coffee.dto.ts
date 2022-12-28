import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

@InputType()
export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  brand: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  description: string;

  @IsArray()
  @IsString({ each: true })
  @Field(() => [String])
  flavours: string[];

  @IsArray()
  @IsString({ each: true })
  @Field(() => [String])
  ingredients: string[];
}
