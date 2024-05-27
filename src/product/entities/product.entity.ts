import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';

@ObjectType()
export class Product {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Float)
  price: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => Category, {
    nullable: true,
  })
  category?: Category | null;
}
