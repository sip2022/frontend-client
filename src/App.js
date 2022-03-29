import Layout from './components/layout/layout';
import InicioPage from './pages/InicioPage'
import ActividadesPage from './pages/ActividadesPage'
import PlanesPage from './pages/PlanesPage'
import ContactosPage from './pages/ContactosPage'

import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<InicioPage />} />
          <Route path='/actividades' element={<ActividadesPage />} />
          <Route path='/planes' element={<PlanesPage />} />
          <Route path='/contactos' element={<ContactosPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
