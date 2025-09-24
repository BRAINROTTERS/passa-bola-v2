// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './routes/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './routes/Home';
import Copa from './routes/Copa';
import SobreContato from './routes/SobreContato';
import LoginPage from './routes/LoginPage';
import RegistrationPage from './routes/RegistrationPage';
import AdminPage from './routes/AdminPage';
import ChaveamentoPage from './routes/ChaveamentoPage'; 

function App() {
  return (
    <AuthProvider>
      
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/copa" element={<Copa />} />
              <Route path="/sobrenos" element={<SobreContato />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chaveamento" element={<ChaveamentoPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      
    </AuthProvider>
  );
}

export default App;