import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() => String)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => String, {
    nullable: true,
  })
  category_id?: string;
}
