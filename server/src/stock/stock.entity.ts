import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Book } from 'src/book/book.entity';

@Table({ tableName: 'stock' })
export class Stock extends Model {
  // Declarations
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING(12))
  stock_id: string;

  @ForeignKey(() => Book)
  @AllowNull(false)
  @Column(DataType.STRING(5))
  id_buku: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  jumlah: number;

  // Associations
  @BelongsTo(() => Book)
  book: Book;
}
