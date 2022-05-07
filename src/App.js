import Layout from './components/layout/layout';
import InicioPage from './pages/InicioPage'
import ActividadesPage from './pages/ActividadesPage'
import PlanesPage from './pages/PlanesPage'
import ContactosPage from './pages/ContactosPage'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'

import {Routes, Route} from 'react-router-dom';
import NewUserPage from './pages/NewUser';
import UserListPage from './pages/UserListPage';
import ActivacionPage from './pages/ActivacionPage';
import Actividad from './components/actividadesPage/Actividad';
import UserInfo from './components/user/UserInfo';
import UserEditInfo from './components/user/UserEdit/UserEditInfo';



function App() {

  return (
    <div>
      <Layout>
        <Routes>
          {/* User Routes */}
          <Route exact path='/' element={<InicioPage />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/user/info' exact element={<UserInfo />} />
          <Route path='/user/info/change' exact element={<UserEditInfo />} />
          {/* "/user/info/pass" */}

          {/* Actividades Routes */}
          <Route path='/actividades' element={<ActividadesPage />} />
          <Route path='/actividad/:id' element={<Actividad />} />

          {/* Planes Routes */}
          <Route path='/planes' element={<PlanesPage />} />

          <Route path='/contactos' element={<ContactosPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/newUser' element={<NewUserPage />} />
          <Route path='/activacion' element={<ActivacionPage />} />
          <Route path='/userList' element={<UserListPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
