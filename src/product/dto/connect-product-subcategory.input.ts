import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConnectProductSubcategoryInput {
  @Field()
  id: string;

  @Field()
  subcategory_id: string;
}
