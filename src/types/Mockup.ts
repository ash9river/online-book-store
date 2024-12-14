import { P } from 'msw/lib/core/GraphQLHandler-Cjm7JNGi';
import { ApiResponse } from './ApiResponse';
import { Book } from './Book';

// 책 목록 조회

export type RetrieveBookListParams = {
  pageNumber: string;
  pageSize: string;
  title?: string;
  author?: string;
};

// REST API 는 GET body가 비어있어야함
// 그렇지만 msw 공식 라이브러리에는 request body를 활용한다.
// https://mswjs.io/docs/best-practices/typescript/

export type RetrieveBookListRequestBody = {};

export type RetrieveBookListResponseBody = ApiResponse<{
  books: Book[];
  totalPages: number;
  totalBooks: number;
}>;

export type SameParams = {
  id: string;
};

// 책 상세 정보 조회

export type RetrieveBookDetailParams = SameParams;

export type RetrieveBookDetailRequestBody = {};

export type RetrieveBookDetailResponseBody = ApiResponse<{
  book: Book;
}>;

// 책 추가

export type AddBookItemParams = {};

export type AddBookItemRequestBody = Omit<Book, 'bookId'>;

export type AddBookItemResponseBody = ApiResponse<{}>;

// 책 정보 수정

export type ModifyBookItemParams = SameParams;

export type ModifyBookItemRequestBody = Book;

export type ModifyBookItemResponseBody = ApiResponse<{}>;

// 책 삭제

export type DeleteBookItemParams = SameParams;

export type DeleteBookItemRequestBody = {};

export type DeleteBookItemResponseBody = ApiResponse<{}>;
