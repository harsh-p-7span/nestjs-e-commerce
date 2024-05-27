import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  providers: [ProductResolver, ProductService],
  imports: [PrismaModule],
})
export class ProductModule {}
