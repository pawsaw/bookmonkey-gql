import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';

@Module({
  providers: [BooksResolver, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
