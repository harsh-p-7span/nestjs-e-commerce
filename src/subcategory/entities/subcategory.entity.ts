import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Subcategory {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Product])
  @ManyToMany(() => Product, (product) => product.subcategories)
  products: Product[];
}
