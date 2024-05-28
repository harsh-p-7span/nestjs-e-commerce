import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoryResolver } from './subcategory.resolver';
import { SubcategoryService } from './subcategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory])],
  providers: [SubcategoryResolver, SubcategoryService],
})
export class SubcategoryModule {}
