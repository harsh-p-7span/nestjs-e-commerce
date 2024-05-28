import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { Subcategory } from './entities/subcategory.entity';
import { GraphQLResolveInfo } from 'graphql';
import { fieldsList } from 'graphql-fields-list';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  create(createSubcategoryInput: CreateSubcategoryInput) {
    const newProduct = this.subcategoryRepository.create(
      createSubcategoryInput,
    );
    return this.subcategoryRepository.save(newProduct);
  }

  async findAll(info: GraphQLResolveInfo) {
    const fields = fieldsList(info);
    const subcategories = await this.subcategoryRepository.find({
      select: fields as (keyof Subcategory)[],
    });
    console.log(subcategories);

    return subcategories;
  }

  findOne(id: number, info: GraphQLResolveInfo) {
    const fields = fieldsList(info);

    return this.subcategoryRepository.findOneOrFail({
      where: {
        id,
      },
      select: fields as (keyof Subcategory)[],
    });
  }

  async update(
    id: number,
    productData: UpdateSubcategoryInput,
    info: GraphQLResolveInfo,
  ) {
    await this.subcategoryRepository.update(id, productData);
    return this.findOne(id, info);
  }

  async remove(id: number) {
    const result = await this.subcategoryRepository.delete(id);
    console.log(result);

    return 'Subcategory deleted successfully';
  }
}
