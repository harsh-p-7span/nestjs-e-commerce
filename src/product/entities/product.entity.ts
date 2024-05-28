import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

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

  @Field(() => [Subcategory], {
    nullable: true,
  })
  subcategories?: Subcategory[];
}
