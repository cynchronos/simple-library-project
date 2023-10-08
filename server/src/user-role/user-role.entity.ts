import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  DataType,
  HasMany,
  Unique,
} from 'sequelize-typescript';
import { Account } from 'src/account/account.entity';

@Table({ tableName: 'user_role' })
export class UserRole extends Model {
  // Declarations
  @PrimaryKey
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  role_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  role_name: string;

  // Association
  @HasMany(() => Account)
  accounts: Account[];
}
