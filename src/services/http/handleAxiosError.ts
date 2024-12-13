import { isAxiosError } from 'axios';

function handleAxiosError(err: unknown) {
  if (isAxiosError(err)) {
    const status = err.response?.status;
    const errorMessage = err.response?.data?.message || err.message;

    switch (status) {
      case 400:
        console.error(`Bad Request: ${errorMessage}`);
        break;
      case 401:
        console.error(`Unauthorized: ${errorMessage}`);
        break;
      case 403:
        console.error(`Forbidden: ${errorMessage}`);
        break;
      case 404:
        console.error(`Not Found: ${errorMessage}`);
        break;
      case 500:
        console.error(`Internal Server Error: ${errorMessage}`);
        break;
      default:
        console.error(`HTTP Error (${status}): ${errorMessage}`);
    }

    return new Error(
      `status ${status}: ${errorMessage}\n 요청이 실패하였습니다.`,
    );
  } else {
    console.error('예상하지 못한 에러가 발생하였습니다. ', err);

    return new Error('예상하지 못한 에러가 발생하였습니다. ');
  }
}

export default handleAxiosError;
