import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => ID, { description: 'The id of the author' })
  id: string;

  @Field({ description: 'The full name of the author' })
  fullName: string;

  @Field({ description: 'The first name of the author' })
  firstName: string;

  @Field({ description: 'The last name of the author' })
  lastName: string;
}
