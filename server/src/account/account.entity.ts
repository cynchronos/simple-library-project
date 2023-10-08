import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserRole } from 'src/user-role/user-role.entity';
import { User } from 'src/user/user.entity';

@Table({ tableName: 'account' })
export class Account extends Model {
  // Declarations

  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUIDV4)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.STRING)
  user_id: string;

  @ForeignKey(() => UserRole)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, defaultValue: 3 })
  role_id: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  access_token: string;

  // Associations
  @BelongsTo(() => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;

  @BelongsTo(() => UserRole, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  role: UserRole;
}
