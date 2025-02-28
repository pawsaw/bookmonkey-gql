import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthorSearchInput {
  @Field({
    nullable: true,
    description:
      'Filter authors with associated books that somehow match this search term (fuzzy search).',
  })
  bookSearchTerm?: string;

  @Field({
    nullable: true,
    description:
      'Filter authors with names that somehow match this search term (fuzzy search).',
  })
  nameSearchTerm?: string;
}
