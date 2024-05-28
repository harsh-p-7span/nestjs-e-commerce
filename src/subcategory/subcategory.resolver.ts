import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoryService } from './subcategory.service';

@Resolver(() => Subcategory)
export class SubcategoryResolver {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Mutation(() => Subcategory)
  createSubcategory(
    @Args('createSubcategoryInput')
    createSubcategoryInput: CreateSubcategoryInput,
  ) {
    return this.subcategoryService.create(createSubcategoryInput);
  }

  @Query(() => [Subcategory])
  subcategories(@Info() info: GraphQLResolveInfo) {
    return this.subcategoryService.findAll(info);
  }

  @Query(() => Subcategory)
  subcategory(@Args('id') id: number, @Info() info: GraphQLResolveInfo) {
    return this.subcategoryService.findOne(id, info);
  }

  @Mutation(() => Subcategory)
  updateSubcategory(
    @Args('id') id: number,
    @Args('subcategory') subcategory: UpdateSubcategoryInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.subcategoryService.update(id, subcategory, info);
  }

  @Mutation(() => String)
  removeSubcategory(@Args('id') id: number) {
    return this.subcategoryService.remove(id);
  }
}
