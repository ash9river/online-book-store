import {
  Box,
  Button,
  Card,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import useBookListQuery from '../hooks/useBookListQuery';
import useSearchParamsStore from '../stores/useSearchParamsStore';
import { useNavigate } from 'react-router-dom';

function BookListItem() {
  const navigate = useNavigate();
  const { pageNumber, title, author, setPageNumber } = useSearchParamsStore();

  const { data: bookList } = useBookListQuery({
    pageNumber: pageNumber.toString(),
    pageSize: '10',
    title: title.length > 0 ? title : undefined,
    author: author.length > 0 ? author : undefined,
  });

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {bookList?.data?.books.map((bookItem) => {
        return (
          <ListItem
            key={`bookList-${bookItem.bookId}`}
            disablePadding
            disableGutters
            component="div"
            onClick={() => navigate(`/books/${bookItem.bookId}`)}
          >
            <Card
              sx={{
                width: '100%',
                m: 1.5,
                p: 3,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  width: '100%',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography>{bookItem.title}</Typography>

                <Typography sx={{ textAlign: 'center' }}>
                  재고: {bookItem.stock}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                }}
              >
                <Typography>{bookItem.author}</Typography>
                <Typography>{bookItem.price}원</Typography>
              </Stack>
            </Card>
          </ListItem>
        );
      })}
    </List>
  );
}

export default BookListItem;
