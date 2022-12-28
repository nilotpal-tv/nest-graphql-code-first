import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Coffee {
  @Field(() => ID)
  id: number;
  title: string;
  brand: string;
  flavours: String[];
  description: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}
