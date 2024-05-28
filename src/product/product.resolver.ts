import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GraphQLResolveInfo } from 'graphql';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { PaginationArgs } from 'src/common/dto/pagination.args';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product, Subcategory])
  products(
    @Args() paginationArgs: PaginationArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Product[]> {
    return this.productService.findAll(paginationArgs, info);
  }

  @Query(() => Product)
  product(@Args('id') id: number, @Info() info: GraphQLResolveInfo) {
    return this.productService.findOne(id, info);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('id') id: number,
    @Args('product') product: UpdateProductInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.productService.update(id, product, info);
  }

  @Mutation(() => String)
  removeProduct(@Args('id') id: number): Promise<string> {
    return this.productService.remove(id);
  }
}
