import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { AuthorSearchInput } from './dto/author-search.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [Author], { name: 'authors' })
  findAll(
    @Args('search', {
      nullable: true,
      description: 'Filter the results by the given searchTerms',
    })
    searchInput: AuthorSearchInput,
  ) {
    return this.authorsService.findAll(searchInput);
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.authorsService.findOne(id);
  }
}
