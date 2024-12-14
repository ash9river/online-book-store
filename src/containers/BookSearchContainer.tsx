import {
  Box,
  FormControl,
  IconButton,
  NativeSelect,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import useSearchParamsStore from '../stores/useSearchParamsStore';

function BookSearchContainer() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('title');

  const { setTitle, setAuthor } = useSearchParamsStore();

  function handleTextEnter(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      if (searchCategory === 'title') {
        setTitle(target.value);
        setAuthor('');
      } else {
        setTitle('');
        setAuthor(target.value);
      }
    }
  }

  function handleSearchButtonClick() {
    if (searchCategory === 'title') {
      setTitle(searchValue);
      setAuthor('');
    } else {
      setTitle('');
      setAuthor(searchValue);
    }
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <NativeSelect
          value={searchCategory}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setSearchCategory(event.target.value)
          }
          inputProps={{
            name: 'category',
            id: 'uncontrolled-native',
          }}
        >
          <option value="title">제목</option>
          <option value="author">저자</option>
        </NativeSelect>
      </FormControl>
      <TextField
        id="standard-search"
        type="search"
        variant="standard"
        value={searchValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchValue(event.target.value);
        }}
        onKeyDown={(event) => handleTextEnter(event)}
      />
      <IconButton
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={handleSearchButtonClick}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default BookSearchContainer;
