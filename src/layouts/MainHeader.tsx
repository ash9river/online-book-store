import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function MainHeader() {
  const navigate = useNavigate();

  function handleHomeClick() {
    navigate('/');
  }

  function handleBookAddButtonClick() {
    navigate('/books/new');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleHomeClick}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              온라인 서점을 위한 웹 애플리케이션
            </Typography>
          </Toolbar>
          <Button color="inherit" onClick={handleBookAddButtonClick}>
            <Typography sx={{ mr: 2, fontWeight: '600' }}>책 추가</Typography>
          </Button>
        </Stack>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
