import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [PrismaModule],
})
export class CategoryModule {}
