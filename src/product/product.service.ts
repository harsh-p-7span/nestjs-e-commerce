import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

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

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async update(id: number, productData: UpdateProductInput): Promise<Product> {
    await this.productsRepository.update(id, productData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    const result = await this.productsRepository.delete(id);
    console.log(result);

    return 'Product deleted successfully';
  }
}
