import { Book } from '../entities/book.entity';

export interface BookTransient extends Omit<Book, 'author'> {
  author: string;
}
