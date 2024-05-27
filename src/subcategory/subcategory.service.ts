import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSubcategoryInput): Promise<Subcategory> {
    return this.prisma.subcategory.create({
      data,
      include: {
        products: true,
      },
    });
  }

  async findAll(): Promise<Subcategory[]> {
    return this.prisma.subcategory.findMany({
      include: {
        products: true,
      },
    });
  }

  async findOne(id: string): Promise<Subcategory> {
    const product = await this.prisma.subcategory.findUnique({
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

  async update(data: UpdateSubcategoryInput): Promise<Subcategory> {
    return this.prisma.subcategory.update({
      where: {
        id: data.id,
      },
      data,
      include: {
        products: true,
      },
    });
  }

  async delete(id: string): Promise<Subcategory> {
    return this.prisma.subcategory.delete({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
  }
}
