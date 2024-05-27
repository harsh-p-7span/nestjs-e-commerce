import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => String, {
    nullable: true,
  })
  category_id?: string;
}
