import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Coffee {
  id: string;
  title: string;
  brand: string;
  flavours: string[];
  description: string;
  ingredients: string[];
  createdAt: Date;
  updatedAt: Date;
}
