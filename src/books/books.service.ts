import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';
import { BookTransient } from './dto/book-transient';

@Injectable()
export class BooksService {
  private readonly baseUrl = 'http://localhost:4730/books';

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ...createBookInput }),
    });

    if (!response.ok) {
      throw new Error(`Couldn't create the book.`);
    }

    const transientBook = (await response.json()) as BookTransient;

    return BooksService.fromTransient(transientBook);
  }

  async findAll(searchTerm?: string): Promise<Book[]> {
    const res = await fetch(
      `${this.baseUrl}${searchTerm ? '?q=' + encodeURIComponent(searchTerm) : ''}`,
    );
    if (!res.ok) {
      throw new Error(`Couldn't load the books.`);
    }
    const transientBooks = (await res.json()) as BookTransient[];
    return transientBooks.map((transientBook) =>
      BooksService.fromTransient(transientBook),
    );
  }

  async findOne(isbn: string): Promise<Book> {
    const transientBook = await this.findOneTransient(isbn);
    return BooksService.fromTransient(transientBook);
  }

  async update(isbn: string, updateBookInput: UpdateBookInput): Promise<Book> {
    const transientBook = await this.findOneTransient(isbn);

    const response = await fetch(`${this.baseUrl}/${isbn}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...transientBook, ...updateBookInput, isbn }),
    });

    if (!response.ok) {
      throw new Error(`Couldn't update the book with the ISBN "${isbn}".`);
    }

    return this.findOne(isbn);
  }

  async remove(isbn: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${isbn}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Couldn't delete the book with the ISBN "${isbn}".`);
    }
  }

  private async findOneTransient(isbn: string): Promise<BookTransient> {
    const res = await fetch(`${this.baseUrl}/${isbn}`);
    if (!res.ok) {
      throw Error(`Couldn't find book with ISBN "${isbn}".`);
    }
    return (await res.json()) as BookTransient;
  }

  private static fromTransient(bookTransient: BookTransient): Book {
    return {
      ...bookTransient,
      author: BooksService.authorsForBook(bookTransient),
    } as Book;
  }

  private static simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      hash |= 0; // Convert to a 32-bit integer
    }
    return ('00000000' + (hash >>> 0).toString(16)).slice(-8); // Convert to hex
  }

  private static authorsForBook(book: BookTransient): Author[] {
    const authors: Author[] = [];
    const authorNames = book.author
      .split(',')
      .map((authorName) => authorName.trim());
    authors.push(
      ...authorNames.map((authorName) => {
        const names = authorName.split(' ');
        return {
          id: this.simpleHash(authorName),
          fullName: authorName,
          firstName: names.at(0),
          lastName: names.at(-1),
        } as Author;
      }),
    );
    return authors;
  }
}
