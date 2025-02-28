import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly booksService: BooksService) {}

  async findAll(): Promise<Author[]> {
    const books = await this.booksService.findAll();
    return books.reduce((authors, book) => {
      authors.push(...book.author);
      return authors;
    }, [] as Author[]);
  }

  async findOne(id: string) {
    return (await this.findAll()).find((author) => author.id === id);
  }
}
