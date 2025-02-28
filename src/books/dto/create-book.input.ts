import { InputType, Int, Field } from '@nestjs/graphql';
import { BookTransient } from './book-transient';

@InputType()
export class CreateBookInput implements Omit<BookTransient, 'id'> {
  @Field({
    description: 'The title of the book.',
  })
  title: string;

  @Field({
    description: 'The subtitle of the book',
  })
  subtitle: string;

  @Field({
    description: 'The isbn of the book. This is the same as id',
  })
  isbn: string;

  @Field({
    description: 'The abstract of the book',
  })
  abstract: string;

  @Field({
    description:
      'The authors of the book. This may be a comma seperated string of authors',
  })
  author: string;

  @Field({
    description: 'The publisher of the book',
  })
  publisher: string;

  @Field({
    description: 'The price of the book',
  })
  price: string;

  @Field(() => Int, {
    description: 'The number of pages of a book',
  })
  numPages: number;

  @Field({
    description: 'The cover url of the book',
  })
  cover: string;
}
