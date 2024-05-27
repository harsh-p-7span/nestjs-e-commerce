import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
