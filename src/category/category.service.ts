import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryInput): Promise<Category> {
    return this.prisma.category.create({
      data,
      include: {
        products: true,
      },
    });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        products: true,
      },
    });
  }

  async findOne(id: string): Promise<Category> {
    const product = await this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(
    id: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id,
      },
      data,
      include: {
        products: true,
      },
    });
  }

  async delete(id: string): Promise<Category> {
    return this.prisma.category.delete({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
  }
}
