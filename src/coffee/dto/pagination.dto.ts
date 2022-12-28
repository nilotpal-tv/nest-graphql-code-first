import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@InputType({
  description: `
  LIMIT represents how many documents.
  SKIP represents how documents to skip.
`,
})
export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @Field(() => Number)
  limit: number;

  @IsNumber()
  @IsPositive()
  @Field(() => Number)
  skip: number;
}
