import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import useBookListQuery from '../hooks/useBookListQuery';
import useSearchParamsStore from '../stores/useSearchParamsStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { deleteData } from '../services/http/deleteData';
import queryClient from '../services/tanstackQueryClient';

function BookDetailContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { pageNumber, title, author } = useSearchParamsStore();
  const { data: bookItem } = useBookListQuery(
    {
      pageNumber: pageNumber.toString(),
      pageSize: '10',
      title: title.length > 0 ? title : undefined,
      author: author.length > 0 ? author : undefined,
    },
    (data) => {
      if (typeof id === 'undefined') {
        alert('인터넷 상태를 확인해주세요.');
        return data;
      }
      return {
        ...data,
        data: {
          books:
            data.data?.books.filter((book) => book.bookId === parseInt(id)) ||
            [],
          totalPages: data.data?.totalPages || 0,
          totalBooks: data.data?.totalBooks || 0,
        },
      };
    },
  );

  const { mutate } = useMutation({
    mutationFn: () => deleteData(`/books/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      navigate('/books');
    },
    onError: () => alert('삭제가 실패하였습니다.'),
  });

  function handleOnEditButtonClick() {
    navigate('edit');
  }

  function handleOnRemoveButtonClick() {
    mutate();
  }

  return (
    <Card
      sx={{
        maxWidth: 340,
        m: 'auto',
        mt: 2,
      }}
    >
      {bookItem && (
        <>
          <CardContent sx={{ pb: 0 }}>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontWeight: 700 }}
              >
                {bookItem.data?.books[0].title}
              </Typography>

              <Typography>재고: {bookItem.data?.books[0].stock}</Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography>{bookItem.data?.books[0].author}</Typography>
              <Typography>{bookItem.data?.books[0].price}원</Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Button size="small" onClick={handleOnEditButtonClick}>
                수정하기
              </Button>
              <Button
                size="small"
                onClick={handleOnRemoveButtonClick}
                color="error"
              >
                삭제
              </Button>
            </Stack>
          </CardActions>
        </>
      )}
    </Card>
  );
}

export default BookDetailContainer;
