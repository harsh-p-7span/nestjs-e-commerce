import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { SubcategoryResolver } from './subcategory.resolver';
import { SubcategoryService } from './subcategory.service';

@Module({
  providers: [SubcategoryResolver, SubcategoryService],
  imports: [PrismaModule],
})
export class SubcategoryModule {}
