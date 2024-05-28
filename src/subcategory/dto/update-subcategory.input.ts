import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSubcategoryInput } from './create-subcategory.input';

@InputType()
export class UpdateSubcategoryInput extends PartialType(
  CreateSubcategoryInput,
) {}
