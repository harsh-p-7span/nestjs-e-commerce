import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoryService } from './subcategory.service';

@Resolver(() => Subcategory)
export class SubcategoryResolver {
  constructor(private readonly productService: SubcategoryService) {}

  @Mutation(() => Subcategory)
  createSubcategory(
    @Args('data') data: CreateSubcategoryInput,
  ): Promise<Subcategory> {
    return this.productService.create(data);
  }

  @Query(() => [Subcategory], {
    name: 'subcategories',
  })
  findAll(): Promise<Subcategory[]> {
    return this.productService.findAll();
  }

  @Query(() => Subcategory, {
    name: 'subcategory',
  })
  findOne(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ): Promise<Subcategory> {
    return this.productService.findOne(id);
  }

  @Mutation(() => Subcategory)
  updateSubcategory(
    @Args('data') data: UpdateSubcategoryInput,
  ): Promise<Subcategory> {
    return this.productService.update(data);
  }

  @Mutation(() => Subcategory)
  deleteSubcategory(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ): Promise<Subcategory> {
    return this.productService.delete(id);
  }
}
