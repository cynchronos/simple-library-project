import {
  AllowNull,
  Column,
  DataType,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/account/account.entity';

@Table({ tableName: 'user' })
export class User extends Model {
  // Declarations
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  user_id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstname: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  lastname: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  address: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phone_number: string;

  @HasOne(() => Account)
  account: Account;
}
