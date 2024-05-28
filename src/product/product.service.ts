import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GraphQLResolveInfo } from 'graphql';
import { fieldsList } from 'graphql-fields-list';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductInput);
    return this.productsRepository.save(newProduct);
  }

  async findAll(info: GraphQLResolveInfo): Promise<Product[]> {
    const fields = fieldsList(info);
    const products = await this.productsRepository.find({
      select: fields as (keyof Product)[],
    });
    console.log(products);

    return products;
  }

  findOne(id: number, info: GraphQLResolveInfo): Promise<Product> {
    const fields = fieldsList(info);

    return this.productsRepository.findOneOrFail({
      where: {
        id,
      },
      select: fields as (keyof Product)[],
    });
  }

  async update(
    id: number,
    productData: UpdateProductInput,
    info: GraphQLResolveInfo,
  ): Promise<Product> {
    await this.productsRepository.update(id, productData);
    return this.findOne(id, info);
  }

  async remove(id: number): Promise<string> {
    const result = await this.productsRepository.delete(id);
    console.log(result);

    return 'Product deleted successfully';
  }
}
