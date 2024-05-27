import { Field, ObjectType } from '@nestjs/graphql';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

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

  @Field(() => [Subcategory], {
    nullable: true,
  })
  subcategories?: Subcategory[];
}
