import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { Prisma } from '@prisma/client';

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
    const { id, ...updateData } = data;
    return this.productService.update(
      id,
      updateData as Prisma.ProductUpdateInput,
    );
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
