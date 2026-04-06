import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { AccessDenied } from './components/ProtectedRoute';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListagemPacientes from './pages/ListagemPacientes';
import AgendamentoPage from './pages/AgendamentoPage';
import NavigationBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <NavigationBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/listagemPacientes" element={
            <AccessDenied>
              <ListagemPacientes />
            </AccessDenied>
            } />
          <Route path="/agendamento" element={
            <AccessDenied>
              <AgendamentoPage />
            </AccessDenied>
            } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;