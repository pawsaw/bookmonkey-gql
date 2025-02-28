import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll(
    @Args('searchTerm', {
      type: () => String,
      nullable: true,
      description: 'Run a fuzzy search on all properties of a book.',
    })
    searchTerm?: string,
  ) {
    return this.booksService.findAll(searchTerm);
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('isbn', { type: () => String }) isbn: string) {
    return this.booksService.findOne(isbn);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('isbn', { type: () => String }) isbn: string,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ) {
    return this.booksService.update(isbn, updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('isbn', { type: () => String }) isbn: string) {
    return this.booksService.remove(isbn);
  }
}
