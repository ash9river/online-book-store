import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // 홈 페이지로 이동
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        페이지를 찾을 수 없습니다.
      </Typography>
      <Typography gutterBottom>
        요청하신 페이지가 없거나 잘못된 URL입니다. 다시 한 번 확인해주세요.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 4 }}
        onClick={handleGoHome}
      >
        홈으로 돌아가기
      </Button>
    </Container>
  );
}

export default ErrorPage;
