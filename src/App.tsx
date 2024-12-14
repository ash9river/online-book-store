import BookDetailEdit from './pages/BookDetailEdit';
import MainLayout from './layouts/MainLayout';
import BookDetail from './pages/BookDetail';
import BookList from './pages/BookList';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import BookAdd from './pages/BookAdd';
import ErrorPage from './pages/ErroePage';

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
function App() {
  return <RouterProvider router={router} />;
}

export default App;
