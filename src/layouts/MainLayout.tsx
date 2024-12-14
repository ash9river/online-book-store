import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';

function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default MainLayout;
