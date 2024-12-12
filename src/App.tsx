import MainLayout from 'layouts/MainLayout';
import BookList from 'pages/BookList';
import Home from 'pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    // errorElement: <ErrorPage />, 에러 페이지 들어가야함
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <BookList />,
      },
      {
        path: 'course',
        element: <CoursePage />,
      },
      {
        path: 'facility',
        element: <FacilityPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
