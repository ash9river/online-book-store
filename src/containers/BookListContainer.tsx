import { ChangeEvent, useEffect, useState } from 'react';
import BookSearchContainer from './BookSearchContainer';
import { Box, Pagination } from '@mui/material';
import useBookListQuery from '../hooks/useBookListQuery';
import useSearchParamsStore from '../stores/useSearchParamsStore';
import BookListItem from '../components/BookListItem';

function BookListContainer() {
  const { pageNumber, title, author, setPageNumber } = useSearchParamsStore();

  const { data: bookList } = useBookListQuery({
    pageNumber: pageNumber.toString(),
    pageSize: '10',
    title: title.length > 0 ? title : undefined,
    author: author.length > 0 ? author : undefined,
  });

  function handlePaginationChange(_event: ChangeEvent<unknown>, page: number) {
    setPageNumber(page);
  }

  useEffect(() => {
    if (bookList?.data?.books.length === 0) {
      setPageNumber(1);
    }
  }, [bookList]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <BookSearchContainer />
      {bookList && <BookListItem />}
      {bookList && bookList.data?.totalPages && (
        <Pagination
          count={bookList.data.totalPages}
          page={pageNumber}
          onChange={handlePaginationChange}
        />
      )}
    </Box>
  );
}

export default BookListContainer;
