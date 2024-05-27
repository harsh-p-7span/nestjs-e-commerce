import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly productService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(@Args('data') data: CreateCategoryInput): Promise<Category> {
    return this.productService.create(data);
  }

  @Query(() => [Category], {
    name: 'categories',
  })
  findAll(): Promise<Category[]> {
    return this.productService.findAll();
  }

  @Query(() => Category, {
    name: 'category',
  })
  findOne(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ): Promise<Category> {
    return this.productService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(@Args('data') data: UpdateCategoryInput): Promise<Category> {
    return this.productService.update(data);
  }

  @Mutation(() => Category)
  deleteCategory(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ): Promise<Category> {
    return this.productService.delete(id);
  }
}
