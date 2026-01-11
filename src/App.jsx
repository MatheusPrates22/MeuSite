import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Receitas from './pages/Receitas/Receitas';
import Financas from './pages/Financas/Financas';
import Trade from './pages/Trade/Trade';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/receitas" replace />} />
          <Route path="receitas" element={<Receitas />} />
          <Route path="financas" element={<Financas />} />
          <Route path="trade" element={<Trade />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
