import Layout from './components/layout/layout';
import InicioPage from './pages/InicioPage'
import List_Actividades from "./components/actividadesPage/List_Actividades";
import InicioUser from "./components/user/InicioUser";

import {Routes, Route} from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import Actividad from './components/actividadesPage/Actividad';
import UserInfo from './components/user/UserInfo';
import UserEditInfo from './components/user/UserEdit/UserEditInfo';
import ActividadesLista from './components/admin/actividades/Admin_ActividadesLista';
import NewActividadForm from './components/admin/actividades/NewActividad';
import ActividadEditForm from './components/admin/actividades/ActividadEdit';
import New_Class from './components/admin/availableClasses/New_Class';
import New_Timeslot from './components/admin/timeslots/New_Timeslot';
import List_TimeSlot from './components/admin/timeslots/List_Timeslot';
import Edit_Timeslot from './components/admin/timeslots/Edit_Timeslot';
import AdminMenu from './components/admin';
import List_Class from './components/admin/availableClasses/List_Class';
import Edit_Class from './components/admin/availableClasses/Edit_Class';
import UserTurnos from './components/user/Turnos/UserTurnos';
import PagoPlan from './components/planes/PagoPlan';
import User_Pagos from './components/user/Pagos/User_Pagos';
import NewUserForm from './components/login/NewUserForm';
import Asignar_Rol from './components/admin/roles/Asignar_Rol';
import PlanList from './components/planes/PlanList';
import LoginForm from './components/login/LoginForm';
import ActivationSucces from './components/accountActivation/activationSucces';

function App() {

  return (
    <div>
      <Layout>
        <Routes>
          {/* TODO REFACTOR separar en distintos componentes las rutas de clientes y admin */}
          {/* User Routes */}
          <Route exact path='/' element={<InicioPage />} />
          <Route path='/user' element={<InicioUser />} />
          <Route path='/user/info' exact element={<UserInfo />} />
          <Route path='/user/info/change' exact element={<UserEditInfo />} />
          <Route path='/user/reservas' exact element={<UserTurnos />} />
          <Route path='/user/pagos' exact element={<User_Pagos />} />

          {/* Actividades Routes */}
          <Route path='/actividades' element={<List_Actividades />} />
          <Route path='/actividad/:id_act' element={<Actividad />} />

          {/* Planes Routes */}
          <Route path='/planes' element={<PlanList />} />
          <Route path='/planes/:id_plan' element={<PagoPlan />} />

          <Route path='/login' element={<LoginForm />} />
          <Route path='/registro' element={<NewUserForm />} />
          <Route path='/activacion' element={<ActivationSucces />} />
          <Route path='/userList' element={<UserListPage />} />

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminMenu />} />

          <Route path='/admin/actividades' element={<ActividadesLista />} />
          <Route path='/admin/actividad/new' element={<NewActividadForm />} />
          <Route path='/admin/actividad/edit/:id' element={<ActividadEditForm />} />

          <Route path='/admin/timeslot' element={<List_TimeSlot />} />
          <Route path='/admin/timeslot/new' element={<New_Timeslot />} />
          <Route path='/admin/timeslot/edit/:id' element={<Edit_Timeslot />} />
          
          <Route path='/admin/classes' element={<List_Class />} />
          <Route path='/admin/classes/new' element={<New_Class />} />
          <Route path='/admin/classes/edit/:id_class' element={<Edit_Class />} />

          <Route path='/admin/assign-role-to-user' element={<Asignar_Rol />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
