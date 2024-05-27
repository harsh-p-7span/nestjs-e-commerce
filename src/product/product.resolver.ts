import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput): Promise<Product> {
    return this.productService.create(data);
  }

  @Query(() => [Product], {
    name: 'products',
  })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product, {
    name: 'product',
  })
  findOne(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('data') data: UpdateProductInput): Promise<Product> {
    return this.productService.update(data);
  }

  @Mutation(() => Product)
  deleteProduct(
    @Args('id', {
      type: () => String,
    })
    id: string,
  ): Promise<Product> {
    return this.productService.delete(id);
  }
}
