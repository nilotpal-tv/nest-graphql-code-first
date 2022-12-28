import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCoffeeDto } from './create-coffee.dto';

@InputType()
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
