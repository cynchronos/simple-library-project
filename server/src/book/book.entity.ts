import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Category } from 'src/category/category.entity';
import { Stock } from 'src/stock/stock.entity';

@Table({ tableName: 'buku' })
export class Book extends Model {
  // Declarations
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING(5))
  id_buku: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  isbn: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  judul_buku: string;

  @AllowNull(true)
  @Column(DataType.STRING(50))
  pengarang: string;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column(DataType.STRING(5))
  category_id: string;

  @AllowNull(true)
  @Column(DataType.STRING(50))
  penerbit: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  tahun: number;

  @AllowNull(true)
  @Column(DataType.TEXT)
  sinopsis: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  cover_buku: string;

  // Associations
  @HasOne(() => Stock)
  stock: Stock;

  @BelongsTo(() => Category)
  category: Category;
}
