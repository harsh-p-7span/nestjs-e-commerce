import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubcategoryInput } from './dto/create-subcategory.input';
import { UpdateSubcategoryInput } from './dto/update-subcategory.input';
import { Subcategory } from './entities/subcategory.entity';
import { GraphQLResolveInfo } from 'graphql';
import { fieldsList } from 'graphql-fields-list';
import { UploadImageInput } from './dto/upload-image.input';
import { join } from 'path';
import { uploadFileStream } from 'src/utils/upload';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  uploadDir = 'uploads';

  create(createSubcategoryInput: CreateSubcategoryInput) {
    const newProduct = this.subcategoryRepository.create(
      createSubcategoryInput,
    );
    return this.subcategoryRepository.save(newProduct);
  }

  async upload(uploadImageInput: UploadImageInput) {
    console.log(uploadImageInput.image);

    const imageFile: any = await uploadImageInput.image;
    const fileName = `${Date.now()}_${imageFile.filename}`;
    const uploadDir = join(
      this.uploadDir,
      // `profiles_${Math.random()}`,
      'images',
    );
    const imagePath = await uploadFileStream(
      imageFile.createReadStream,
      uploadDir,
      fileName,
    );

    console.log('imagePath >>', imagePath);

    return 'Image uploaded successfully.';
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
