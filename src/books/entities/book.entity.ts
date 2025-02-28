import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';

@ObjectType()
export class Book {
  @Field(() => String, {
    description: 'The id of the book. This is the same as isbn.',
  })
  id: string;

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

  @Field(() => [Author], {
    description: 'The author of the book',
  })
  author: Author[];

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
