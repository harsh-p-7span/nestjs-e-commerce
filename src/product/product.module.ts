import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Subcategory]),
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
