import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/entities/book.entity';
import { AuthorSearchInput } from './dto/author-search.input';

@Injectable()
export class AuthorsService {
  constructor(private readonly booksService: BooksService) {}

  async findAll(searchTerm?: AuthorSearchInput): Promise<Author[]> {
    const books = await this.booksService.findAll(searchTerm?.bookSearchTerm);
    return this.forBooks(books, searchTerm?.nameSearchTerm);
  }

  async findOne(id: string) {
    return (await this.findAll()).find((author) => author.id === id);
  }

  async findAllForBookSearch(bookSearchTerm: string): Promise<Author[]> {
    const books = await this.booksService.findAll(bookSearchTerm);
    return this.forBooks(books);
  }

  private forBooks(books: Book[], nameSearchTerm = ''): Author[] {
    return books.reduce(
      (acc, book) => {
        const { authors, lookup } = acc;
        const filtered = book.author
          .filter((author) => author.fullName.includes(nameSearchTerm))
          .filter((author) => !lookup.has(author.fullName));

        authors.push(...filtered);

        filtered.forEach(({ fullName }) => lookup.add(fullName));

        return acc;
      },
      { lookup: new Set<string>(), authors: [] as Author[] },
    ).authors;
  }
}
