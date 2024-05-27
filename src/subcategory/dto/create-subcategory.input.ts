import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubcategoryInput {
  @Field()
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  category_id?: string;
}
