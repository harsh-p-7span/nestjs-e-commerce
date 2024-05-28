import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductInput): Promise<Product> {
    return this.prisma.product.create({
      data,
      include: {
        subcategories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        subcategories: {
          include: {
            category: true,
          },
        },
      },
    });

    console.log(products);

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        subcategories: {
          include: {
            category: true,
          },
        },
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(data: UpdateProductInput): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id: data.id,
      },
      data,
      include: {
        subcategories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: {
        id,
      },
      include: {
        subcategories: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}
