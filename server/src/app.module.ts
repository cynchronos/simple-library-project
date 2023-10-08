import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { StockModule } from './stock/stock.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';

ConfigModule.forRoot();

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    BookModule,
    StockModule,
    UserModule,
    UserRoleModule,
    AccountModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
