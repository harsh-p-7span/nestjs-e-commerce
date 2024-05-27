import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryInput): Promise<Category> {
    return this.prisma.category.create({
      data,
      include: {
        subcategories: true,
      },
    });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        subcategories: true,
      },
    });
  }

  async findOne(id: string): Promise<Category> {
    const product = await this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        subcategories: true,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(data: UpdateCategoryInput): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id: data.id,
      },
      data,
      include: {
        subcategories: true,
      },
    });
  }

  async delete(id: string): Promise<Category> {
    return this.prisma.category.delete({
      where: {
        id,
      },
      include: {
        subcategories: true,
      },
    });
  }
}
