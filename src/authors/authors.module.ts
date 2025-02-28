import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { BooksModule } from 'src/books/books.module';

@Module({
  providers: [AuthorsResolver, AuthorsService],
  imports: [BooksModule],
})
export class AuthorsModule {}
