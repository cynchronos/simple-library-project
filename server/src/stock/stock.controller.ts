import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('api/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  async fetchAllStocks(): Promise<object> {
    try {
      const stocks = await this.stockService.findAllStocks();

      return {
        code: 200,
        message: 'Stocks Loaded',
        data: stocks,
      };
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createStock(@Body() createStockDto: StockDto): Promise<object> {
    try {
      await this.stockService.createStock(createStockDto);

      return {
        code: 200,
        success: true,
        message: 'Stock Created',
      };
    } catch (error) {
      return error;
    }
  }

  @Put(':stock_id')
  async updateStock(
    @Param('stock_id') category_id: string,
    @Body() updateStockDto: UpdateStockDto,
  ): Promise<object> {
    try {
      await this.stockService.updateStock(category_id, updateStockDto);

      return {
        code: 200,
        success: true,
        message: 'Stock Updated',
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':stock_id')
  async deleteStock(@Param('stock_id') stock_id: string): Promise<object> {
    try {
      await this.stockService.destroyStock(stock_id);

      return {
        code: 200,
        success: true,
        message: 'Stock Deleted',
      };
    } catch (error) {
      return error;
    }
  }
}
