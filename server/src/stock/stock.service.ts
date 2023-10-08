import { Inject, Injectable } from '@nestjs/common';
import { Stock } from './stock.entity';
import { Book } from 'src/book/book.entity';
import * as randomstring from 'randomstring';

@Injectable()
export class StockService {
  constructor(
    @Inject('STOCK_REPOSITORY')
    private readonly stockModel: typeof Stock,
    @Inject('BOOK_REPOSITORY')
    private readonly bookModel: typeof Book,
  ) {}

  public async findAllStocks(): Promise<object> {
    try {
      const stocks: Stock[] = await this.stockModel.findAll<Stock>();

      if (stocks.length < 1) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Stock tidak ditemukan';

        throw error;
      }

      return stocks;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Load Stocks',
        data: error.errorInfo || error,
      };
    }
  }

  public async createStock(newStockData: any): Promise<object> {
    try {
      const stockData = await this.stockModel.findOne({
        where: {
          id_buku: newStockData.id_buku,
        },
      });

      const bookData = await this.bookModel.findOne({
        where: {
          id_buku: newStockData.id_buku,
        },
      });

      if (stockData) {
        const error: any = new Error();
        error.errorCode = 400;
        error.errorInfo = 'Stok Buku sudah ada';

        throw error;
      }

      if (!bookData) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Buku tidak ditemukan';

        throw error;
      }

      const inputStock = {
        stock_id: randomstring.generate({
          length: 5,
          charset: 'numeric',
        }),
        id_buku: newStockData.id_buku,
        jumlah: newStockData.jumlah,
      };

      await this.stockModel.create<Stock>(inputStock);

      return inputStock;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        success: false,
        message: 'Error Create Stock',
        data: error.errorInfo || error,
      };
    }
  }

  public async updateStock(
    stockId: string,
    updateStockData: any,
  ): Promise<object> {
    try {
      const stockData: Stock = await this.stockModel.findOne({
        where: {
          stock_id: stockId,
        },
      });

      if (!stockData) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Stock tidak ditemukan';

        throw error;
      }

      const updateStock: object = {
        id_buku: updateStockData.id_buku || stockData.id_buku,
        jumlah: updateStockData.jumlah || stockData.jumlah,
      };

      await this.stockModel.update(updateStock, {
        where: {
          stock_id: stockId,
        },
      });

      return updateStock;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Update Stock',
        data: error.errorInfo || error,
      };
    }
  }

  public async destroyStock(stockId: string): Promise<object> {
    try {
      const stockData: Stock = await this.stockModel.findOne({
        where: {
          stock_id: stockId,
        },
      });

      if (!stockData) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Stock tidak ditemukan';

        throw error;
      }

      await this.stockModel.destroy({
        where: {
          stock_id: stockId,
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Delete Stock',
        data: error.errorInfo || error,
      };
    }
  }
}
