import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';

@ObjectType()
export class Subcategory {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => [Product])
  products?: Product[];

  @Field(() => Category, {
    nullable: true,
  })
  category?: Category | null;
}
