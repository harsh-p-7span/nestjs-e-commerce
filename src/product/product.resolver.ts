import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product])
  products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product)
  product(@Args('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('id') id: number,
    @Args('product') product: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Mutation(() => String)
  removeProduct(@Args('id') id: number): Promise<string> {
    return this.productService.remove(id);
  }
}
