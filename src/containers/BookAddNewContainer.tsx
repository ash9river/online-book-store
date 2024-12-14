import { Button, Stack, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../services/http/postData';
import queryClient from '../services/tanstackQueryClient';
import { Book } from '../types/Book';

function BookAddNewContainer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    stock: '',
    price: '',
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }
  const { mutate } = useMutation({
    mutationFn: (formData: Omit<Book, 'bookId'>) =>
      postData('/books', formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      navigate('/books');
    },
    onError: () => alert('삭제가 실패하였습니다.'),
  });

  function handleSubmit() {
    mutate({
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
        책 추가하기
      </Button>
    </Stack>
  );
}

export default BookAddNewContainer;
