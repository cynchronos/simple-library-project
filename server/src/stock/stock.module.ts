import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { stockProviders } from './stock.providers';
import { bookProviders } from 'src/book/book.providers';

@Module({
  controllers: [StockController],
  providers: [StockService, ...stockProviders, ...bookProviders],
  exports: [StockService],
})
export class StockModule {}
