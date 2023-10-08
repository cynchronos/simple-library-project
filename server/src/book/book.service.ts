import { Inject, Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';
import { Book } from './book.entity';
import { Stock } from 'src/stock/stock.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookModel: typeof Book,
  ) {}

  async findAllBooks(): Promise<object> {
    try {
      const books: Book[] = await this.bookModel.findAll<Book>({
        include: {
          model: Stock,
          as: 'stock',
          attributes: ['jumlah'],
        },
      });

      if (books.length < 1) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Buku tidak ditemukan';

        throw error;
      }

      books.forEach((book: Book) => {
        book.stock.dataValues = book.stock.jumlah;
      });

      return books;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Load Books',
        data: error.errorInfo || error,
      };
    }
  }

  async findBookById(bookId: string): Promise<object> {
    try {
      const book: Book = await this.bookModel.findOne<Book>({
        where: {
          id_buku: bookId,
        },
        include: {
          model: Stock,
          as: 'stock',
          attributes: ['jumlah'],
        },
      });

      if (!book) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Buku tidak ditemukan';

        throw error;
      }

      book.stock.dataValues = book.stock.jumlah;

      return book;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Load Book',
        data: error.errorInfo || error,
      };
    }
  }

  async createBook(newBookData: any): Promise<object> {
    try {
      const bookData = await this.bookModel.findOne({
        where: {
          judul_buku: newBookData.judul_buku,
        },
      });

      if (bookData) {
        const error: any = new Error();
        error.errorCode = 400;
        error.errorInfo = 'Buku sudah ada';

        throw error;
      }

      const newBook = {
        id_buku: randomstring.generate({
          length: 5,
          charset: 'numeric',
        }),
        isbn: newBookData.isbn,
        judul_buku: newBookData.judul_buku,
        pengarang: newBookData.pengarang,
        category_id: newBookData.category_id,
        penerbit: newBookData.penerbit,
        tahun: newBookData.tahun,
        sinopsis: newBookData.sinopsis,
        cover_buku: newBookData.cover_buku,
      };

      await this.bookModel.create<Book>(newBook);

      return {
        id_buku: newBook.id_buku,
        jumlah: newBookData.stock,
      };
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Create Book',
        data: error.errorInfo || error,
      };
    }
  }

  async updateBook(bookId: string, updateBookData: any): Promise<object> {
    try {
      const bookData: Book = await this.bookModel.findOne({
        where: {
          id_buku: bookId,
        },
      });

      if (!bookData) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Buku tidak ditemukan';

        throw error;
      }

      const updateBook: object = {
        isbn: updateBookData.isbn || bookData.isbn,
        judul_buku: updateBookData.judul_buku || bookData.judul_buku,
        pengarang: updateBookData.pengarang || bookData.pengarang,
        category_id: updateBookData.category_id || bookData.category_id,
        penerbit: updateBookData.penerbit || bookData.penerbit,
        tahun: updateBookData.tahun || bookData.tahun,
        sinopsis: updateBookData.sinopsis || bookData.sinopsis,
        cover_buku: updateBookData.cover_buku || bookData.cover_buku,
      };

      await this.bookModel.update(updateBook, {
        where: {
          id_buku: bookId,
        },
      });

      return {
        success: true,
      };

      // return JSON.stringify({
      //   code: 200,
      //   message: 'Book Updated',
      // });
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Update Book',
        data: error.errorInfo || error,
      };
    }
  }

  async destroyBook(bookId: string): Promise<object> {
    try {
      const bookData = await this.bookModel.findOne({
        where: {
          id_buku: bookId,
        },
      });

      if (!bookData) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Buku tidak ditemukan';

        throw error;
      }

      await this.bookModel.destroy({
        where: {
          id_buku: bookId,
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Delete Book',
        data: error.errorInfo || error,
      };
    }
  }
}
