import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';

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

  @Field(() => [Product], {
    nullable: true,
  })
  products?: Product[];
}
