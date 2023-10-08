import { Sequelize } from 'sequelize-typescript';
import { ConfigModule } from '@nestjs/config';
import { Category } from 'src/category/category.entity';
import { Book } from 'src/book/book.entity';
import { Stock } from 'src/stock/stock.entity';
import { User } from 'src/user/user.entity';
import { UserRole } from 'src/user-role/user-role.entity';
import { Account } from 'src/account/account.entity';

ConfigModule.forRoot();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        timezone: '+07:00',
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'perpustakaan_mobile',
      });
      sequelize.addModels([Category, Book, Stock, User, UserRole, Account]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
