import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import PuestosVotacion from './pages/PuestosVotacion';
import Mesas from './pages/Mesas';
import Analisis from './pages/Analisis';
import Informe from './pages/Informe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="puestos" element={<PuestosVotacion />} />
          <Route path="mesas" element={<Mesas />} />
          <Route path="analisis" element={<Analisis />} />
          <Route path="informe" element={<Informe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
