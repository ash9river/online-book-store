import useBookListQuery from '../hooks/useBookListQuery';
import { useNavigate, useParams } from 'react-router-dom';
import useSearchParamsStore from '../stores/useSearchParamsStore';
import { Button, Input, Stack, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { patchData } from '../services/http/patchData';
import queryClient from '../services/tanstackQueryClient';
import { ChangeEvent, useEffect, useState } from 'react';
import { Book } from '../types/Book';

function BookDetailEditContainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pageNumber, title, author } = useSearchParamsStore();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    stock: '',
    price: '',
  });

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

  useEffect(() => {
    if (bookItem && bookItem.data && bookItem.data.books.length > 0) {
      const book = bookItem.data.books[0];
      setFormData({
        title: book.title || '',
        author: book.author || '',
        stock: book.stock?.toString() || '',
        price: book.price?.toString() || '',
      });
    }
  }, [bookItem]);

  const { mutate } = useMutation({
    mutationFn: (formData: Book) => patchData(`/books/${id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      navigate('../');
    },
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  function handleSubmit() {
    if (!id) return;
    mutate({
      bookId: parseInt(id),
      title: formData.title,
      author: formData.author,
      stock: parseInt(formData.stock, 10),
      price: parseFloat(formData.price),
    });
  }

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        maxWidth: '340px',
        m: 'auto',
        mt: '24px',
      }}
    >
      <TextField
        id="title"
        label="제목"
        value={formData.title}
        onChange={handleInputChange}
      />
      <TextField
        id="author"
        label="저자"
        value={formData.author}
        onChange={handleInputChange}
      />
      <TextField
        id="stock"
        label="재고"
        value={formData.stock}
        onChange={handleInputChange}
        type="number"
      />
      <TextField
        id="price"
        label="가격"
        value={formData.price}
        onChange={handleInputChange}
        type="number"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        수정하기
      </Button>
    </Stack>
  );
}

export default BookDetailEditContainer;
