## 온라인 서점 웹 애플리케이션


**yarn** 패키지를 사용하여 **vite**로 프로젝트를 만들었습니다.

프로젝트를 내려받고 이하의 명령어로 의존성을 설치하시면 됩니다.

```
yarn install
```

그리고 다음의 명령어로 프로젝트를 실행하시면 됩니다.

```
yarn run dev
```

혹은 다음의 url에 접속하여서 확인부탁드립니다.

https://online-book-store-phi.vercel.app

<br/>

## 사용한 기술

**React**, **Typescript**, **vite**, **zustand**, **react-query**, **msw**


`mui` 라이브러리를 통하여 디자인을 하였습니다.

<br/>

## 백엔드 파트

백엔드 파트는 msw를 통해서 모킹함으로써 해결하였습니다.

`main.tsx`에서 `deferRender` 메서드를 통해서 모킹하였습니다.

<details>
  <summary>코드 보기</summary>


```typescript
async function deferRender() {
  const { worker } = await import('./mocks/browser');

  return worker.start();
}

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
});
```
</details>

자세한 로직은 `mocks` 폴더의 `handlers.ts`에서 확인할 수 있습니다.

<br/>

## 프론트 엔드 파트

<br/>

### 라우트 구성

1. `/books` 책 목록 페이지(페이지네이션 적용 및 필터링 구현)
2. `/books/:id` 책 상세 정보 페이지(책 삭제 기능 포함)
3. `/books/:id/edit` 책 정보 수정 페이지(수량 조절기능 포함)
4. `/books/new` 책 추가 페이지


<details>
  <summary>코드 보기</summary>
  
```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="books" replace />,
      },
      {
        path: 'books',
        children: [
          {
            index: true,
            element: <BookList />,
          },
          {
            path: ':id',
            children: [
              {
                index: true,
                element: <BookDetail />,
              },
              {
                path: 'edit',
                element: <BookDetailEdit />,
              },
            ],
          },
          {
            path: 'new',
            element: <BookAdd />,
          },
        ],
      },
    ],
  },
]);
```
</details>

<br/>

### types 폴더

`/src/types`에서 확인할 수 있습니다.

ApiResponse와 기본적인 책 타입인 Book, msw관련한 Mockup 타입을 선언하였습니다.

<br/>

### stores 폴더

`/src/stores`에서 확인할 수 있습니다.

리액트 쿼리의 캐싱 기능 활용을 극대화하기 위해서 쿼리 파라미터를 전역 변수로 만들어서 다루었습니다.

<details>
  <summary>코드 보기</summary>

```typescript
import { create } from 'zustand';

interface useSearchParamsStore {
  pageNumber: number;
  title: string;
  author: string;
  setPageNumber: (pageNumber: number) => void;
  setTitle: (title: string) => void;
  setAuthor: (author: string) => void;
}

const useSearchParamsStore = create<useSearchParamsStore>((set) => ({
  pageNumber: 1,
  title: '',
  author: '',
  setTitle: (title) => set({ title }),
  setAuthor: (author) => set({ author }),
  setPageNumber: (pageNumber) => set({ pageNumber }),
}));

export default useSearchParamsStore;
```
</details>

<br/>

### services 폴더

`/src/services`에서 확인할 수 있습니다.

`tanstackQueryClient.ts`에서는 **tanstack query provider`에 제공할 `queryClient`를 선언하였습니다.

`apiRequestor.ts`에서는 **axiosInstance`를 선언하였고, `baseURL`을 `/api`로 두어서, `axios.get()`과 같은 메서드를 활용할 때, `/api`로 시작하지 않게 하여도 되게 만들었습니다.

`getData.ts`, `postData.ts` 등의 파일에서는 `axiosInstance`를 활용하여서 제네릭하게 데이터를 전달하려고 하였습니다.

`handleAxiosError.ts` 파일에서는 `axios` 에러 핸들링을 하였습니다.
그러나 `react-query/tanstack-query`의 캐싱때문에 이를 제외하였습니다.

### hooks 폴더

`/src/hooks`에서 확인할 수 있습니다.  

`useBookListQuery.ts`에서 리액트 쿼리 커스텀 훅을 만들었습니다.
만약 select가 전달되면 캐싱된 데이터 중에서 상세 데이터를 골라낼 수 있도록 하였습니다.
이를 통해 책 상세 조회 페이지에서 새로운 http 요청을 생성하지 않아도 캐싱된 기존의 응답에서 데이터를 활용하는 것이 가능합니다. 

### containers 폴더

`/src/containers`에서 확인할 수 있습니다.

`BookAddNewContainer.tsx`에서 책 추가 컴포넌트를 따로 분할하지 않고 만들었습니다.

`react-query/tanstack-query`의 `useMutation`을 활용하여 `post` 요청을 보냈습니다.

<details>
  <summary>코드 보기</summary>

```typescript
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
```
</details>


`BookDetailContainer.tsx`에서도 책 상세정보 조회 컴포넌트를 만들었습니다.

`react-query/tanstack-query`의 `select`를 활용하여서 캐싱된 기존의 응답에서 데이터를 활용하였습니다.

물론, 책 상세 정보 조회 요청인 `/api/books/:id`를 활용할 수도 있고 실제로도 msw에 구현해뒀지만, 캐싱된 응답을 이용하는 것이 효율적이다고 판단하였습니다.

<details>
  <summary>캐싱된 응답을 이용하는 코드 보기</summary>

```typescript
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
```
</details>


`BookDetailEditContainer.tsx`에서 책 정보 수정을 할 수 있습니다.

캐싱된 응답을 이용하는 것은 `BookDetailContainer.tsx`와 동일합니다.

`BookListContainer.tsx`에서는 책 리스트를 페이지네이션해서 볼 수 있습니다.

책 검색을 위해서 `BookSearchContainer.tsx` 컴포넌트를 활용하였습니다.

### 컴포넌트 폴더

`/src/componets`에서 확인할 수 있습니다.

리스트로 된 책 컴포넌트입니다.

<br/>

## 화면 구성


### 책 목록 페이지

![책 목록](https://github.com/user-attachments/assets/d08d129a-c2cb-4bb1-9a72-bbc501e456ec)


### 책 상세 정보

![책 상세정보](https://github.com/user-attachments/assets/e751ea6b-02dd-4360-81e6-0be992f3b30f)

### 책 정보 수정

![책 정보 수정](https://github.com/user-attachments/assets/dac2ee77-34c0-4c25-8881-0febe81a7679)


### 책 추가

![책 추가](https://github.com/user-attachments/assets/346fc870-e77a-450a-af10-823281fd25e7)

  

