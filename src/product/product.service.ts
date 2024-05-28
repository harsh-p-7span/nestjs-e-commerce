import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLResolveInfo } from 'graphql';
import { fieldsList } from 'graphql-fields-list';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  create(createProductInput: CreateProductInput) {
    const newProduct = this.productRepository.create(createProductInput);
    return this.productRepository.save(newProduct);
  }

  async findAll(info: GraphQLResolveInfo) {
    const fields = fieldsList(info);

    const products = await this.productRepository.find({
      select: fields as (keyof Product)[],
      relations: {
        subcategories: true,
      },
    });
    console.log(JSON.stringify(products, null, 2));

    return products;
  }

  findOne(id: number, info: GraphQLResolveInfo) {
    const fields = fieldsList(info);

    return this.productRepository.findOneOrFail({
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
  ) {
    await this.productRepository.update(id, productData);
    return this.findOne(id, info);
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);
    console.log(result);

    return 'Product deleted successfully';
  }
}
