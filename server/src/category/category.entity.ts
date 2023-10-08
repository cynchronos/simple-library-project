import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Book } from 'src/book/book.entity';

@Table({ tableName: 'category' })
export class Category extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING(4))
  category_id: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  category_name: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  category_description: string;

  // Associations
  @HasMany(() => Book)
  books: Book[];
}
