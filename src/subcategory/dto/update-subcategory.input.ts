import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSubcategoryInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  category_id?: string;
}
