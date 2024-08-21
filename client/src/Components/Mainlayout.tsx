
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { StorageKeys } from '../utils/interfaces';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  if(localStorage.getItem(StorageKeys.token)) {
    if(location.pathname=="/signin" || location.pathname=="/signup") {
      navigate("/")
    }
  } else {
    if(location.pathname!="/signin" && location.pathname!="/signup") {
      setTimeout(()=>{
        navigate("/signin");
      },100);
    }
  }
  return (<div>
    <Header />
    <main className="p-4">
      <Outlet />
    </main>
  </div>);
}


export default MainLayout;