import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/create-book.dto';
import { StockService } from 'src/stock/stock.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('api/book')
export class BookController {
  constructor(
    private bookService: BookService,
    private readonly stockService: StockService,
  ) {}

  @Get()
  async fetchAllBooks(): Promise<object> {
    try {
      const books = await this.bookService.findAllBooks();

      return {
        code: 200,
        message: 'Book Loaded',
        data: books,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':id_buku')
  async fetchBookById(@Param('id_buku') id_buku: string): Promise<object> {
    try {
      const book = await this.bookService.findBookById(id_buku);

      return {
        code: 200,
        message: 'Book Loaded',
        data: book,
      };
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createBook(@Body() createBookDto: BookDto): Promise<object> {
    try {
      const bookData = await this.bookService.createBook(createBookDto);

      // Send stock to stock service
      await this.stockService.createStock(bookData);

      return {
        code: 200,
        message: 'Book Created',
      };
    } catch (error) {
      return error;
    }
  }

  @Put(':id_buku')
  async updateBook(
    @Param('id_buku') id_buku: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<object> {
    try {
      await this.bookService.updateBook(id_buku, updateBookDto);

      return {
        code: 200,
        message: 'Book Updated',
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':id_buku')
  async deleteBook(@Param('id_buku') id_buku: string): Promise<object> {
    try {
      await this.bookService.destroyBook(id_buku);

      return {
        code: 200,
        message: 'Book Deleted',
      };
    } catch (error) {
      return error;
    }
  }
}
