import { DefaultBodyType, http, HttpResponse } from 'msw';
import { mockupBooks, mockupBooksCounter } from './mockupBooks';
import { Book } from 'types/Book';
import {
  AddBookItemParams,
  AddBookItemRequestBody,
  AddBookItemResponseBody,
  DeleteBookItemParams,
  DeleteBookItemRequestBody,
  DeleteBookItemResponseBody,
  ModifyBookItemParams,
  ModifyBookItemRequestBody,
  ModifyBookItemResponseBody,
  RetrieveBookDetailParams,
  RetrieveBookDetailRequestBody,
  RetrieveBookDetailResponseBody,
  RetrieveBookListParams,
  RetrieveBookListRequestBody,
  RetrieveBookListResponseBody,
} from 'types/Mockup';

export const handlers = [
  // 책 목록 조회
  http.get<
    RetrieveBookListParams,
    RetrieveBookListRequestBody,
    RetrieveBookListResponseBody
  >('/api/books', ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = parseInt(url.searchParams.get('pageNumber') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    const title = url.searchParams.get('title');
    const author = url.searchParams.get('author');

    // 리턴하는 로직

    const filteredBooks = mockupBooks.filter((book) => {
      const matchesTitle = title
        ? book.title.toLowerCase().includes(title.toLowerCase())
        : true;
      const matchesAuthor = author
        ? book.author.toLowerCase().includes(author.toLowerCase())
        : true;
      return matchesTitle && matchesAuthor;
    });

    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedBooks = filteredBooks.slice(
      startIndex,
      startIndex + pageSize,
    );

    const totalPages = Math.ceil(filteredBooks.length / pageSize);
    return HttpResponse.json({
      status: 200,
      data: {
        books: paginatedBooks,
        totalPages,
        totalBooks: filteredBooks.length,
      },
      message: '페이지네이션 조회 성공',
    });
  }),

  // 책 상세 정보 조회
  http.get<
    RetrieveBookDetailParams,
    RetrieveBookDetailRequestBody,
    RetrieveBookDetailResponseBody
  >('/api/books/:id', ({ params }) => {
    const { id } = params;

    const fileteredBook = mockupBooks.filter(
      (book) => book.bookId === parseInt(id),
    );

    return HttpResponse.json({
      status: 200,
      data: {
        book: fileteredBook[0],
      },
      message: '책 조회 성공',
    });
  }),

  // 책 추가
  http.post<AddBookItemParams, AddBookItemRequestBody, AddBookItemResponseBody>(
    '/api/books',
    async ({ request }) => {
      const postItem = (await request.json()) as Book;

      if (
        !postItem ||
        typeof postItem.title !== 'string' ||
        typeof postItem.author !== 'string' ||
        typeof postItem.price !== 'number' ||
        typeof postItem.stock !== 'number'
      ) {
        return HttpResponse.json({
          status: 400,
          message: '데이터가 올바르지 않습니다.',
        });
      }

      mockupBooksCounter.mockupBooksCounter += 1;

      mockupBooks.push({
        bookId: mockupBooksCounter.mockupBooksCounter,
        title: postItem.title,
        author: postItem.author,
        price: postItem.price,
        stock: postItem.stock,
      });

      return HttpResponse.json({
        status: 201,
        message: '책이 성공적으로 추가되었습니다.',
      });
    },
  ),

  // 책 정보 수정

  http.patch<
    ModifyBookItemParams,
    ModifyBookItemRequestBody,
    ModifyBookItemResponseBody
  >('/api/books/:id', async ({ request, params }) => {
    const { id } = params;
    const patchItem = (await request.json()) as Book;

    if (parseInt(id) !== patchItem.bookId) {
      return HttpResponse.json({
        status: 400,
        message: '잘못된 요청입니다.',
      });
    }

    const idx = mockupBooks.findIndex((book) => book.bookId === parseInt(id));
    if (idx === -1) {
      return HttpResponse.json({
        status: 400,
        message: '존재하지 않는 책입니다.',
      });
    }

    mockupBooks[idx] = {
      ...mockupBooks[idx],
      title: patchItem.title,
      author: patchItem.author,
      price: patchItem.price,
      stock: patchItem.stock < 0 ? 0 : patchItem.stock,
    };

    return HttpResponse.json({
      status: 200,
      message: '책 정보 수정 성공',
    });
  }),

  //책 삭제

  http.delete<
    DeleteBookItemParams,
    DeleteBookItemRequestBody,
    DeleteBookItemResponseBody
  >('/api/books/:id', ({ params }) => {
    const { id } = params;

    const idx = mockupBooks.findIndex((book) => book.bookId === parseInt(id));

    if (idx === -1) {
      return HttpResponse.json({
        status: 400,
        message: '존재하지 않는 책입니다.',
      });
    }

    mockupBooks.splice(idx, 1);

    return HttpResponse.json({
      status: 200,
      message: '책 삭제 성공',
    });
  }),
];
