import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { DatabaseModule } from 'src/database/database.module';
import { bookProviders } from './book.providers';
import { stockProviders } from 'src/stock/stock.providers';
import { StockModule } from 'src/stock/stock.module';

@Module({
  imports: [DatabaseModule, StockModule],
  controllers: [BookController],
  providers: [BookService, ...bookProviders, ...stockProviders],
})
export class BookModule {}
