import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductInput): Promise<Product> {
    return this.prisma.product.create({
      data,
      include: {
        category: true,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id,
      },
      data,
      include: {
        category: true,
      },
    });
  }

  async delete(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }
}
