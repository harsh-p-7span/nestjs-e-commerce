import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Float)
  @Column()
  price: number;

  @Field(() => [Subcategory])
  @ManyToMany(() => Subcategory, (subcategory) => subcategory.products)
  @JoinTable()
  subcategories: Subcategory[];
}
