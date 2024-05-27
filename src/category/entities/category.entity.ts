import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
