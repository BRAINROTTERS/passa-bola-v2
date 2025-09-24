// src/routes/AdminPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [times, setTimes] = useState([]);
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('times'); // 'times', 'jogadores', 'adicionar'
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estados para o formulário de adicionar time
  const [novoTime, setNovoTime] = useState({
    teamName: '',
    teamPhotoUrl: '',
    name: '',
    surname: '',
    cpf: '',
    position: '',
    jerseyNumber: ''
  });

  // Verificar se o usuário é admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchDados();
  }, [user, navigate]);

  const fetchDados = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/inscricoes');
      if (!response.ok) {
        throw new Error('Falha ao carregar os dados.');
      }
      const inscricoes = await response.json();
      
      // Filtra os times (com isNewTeam: true)
      const timesUnicos = inscricoes.filter(inscricao => inscricao.isNewTeam);
      setTimes(timesUnicos);
      
      // Filtra os jogadores (com isNewTeam: false)
      const jogadoresUnicos = inscricoes.filter(inscricao => !inscricao.isNewTeam);
      setJogadores(jogadoresUnicos);
      
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError('Erro de conexão com o servidor. Verifique se o backend está rodando.');
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('Tem certeza que deseja excluir este time?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/inscricoes/${teamId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Time excluído com sucesso!');
        fetchDados();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Falha ao excluir o time.');
      }
    } catch (error) {
      console.error('Erro ao excluir time:', error);
      setError('Erro de conexão ao tentar excluir o time.');
    }
  };

  const handleDeletePlayer = async (playerId) => {
    if (!window.confirm('Tem certeza que deseja excluir este jogador?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/inscricoes/${playerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Jogador excluído com sucesso!');
        fetchDados();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Falha ao excluir o jogador.');
      }
    } catch (error) {
      console.error('Erro ao excluir jogador:', error);
      setError('Erro de conexão ao tentar excluir o jogador.');
    }
  };

  const handleAddTeam = async (e) => {
    e.preventDefault();
    
    const timeData = {
      ...novoTime,
      isNewTeam: true
    };

    try {
      const response = await fetch('http://localhost:3000/api/inscricoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeData),
      });

      if (response.ok) {
        setSuccess('Time adicionado com sucesso!');
        setNovoTime({
          teamName: '',
          teamPhotoUrl: '',
          name: '',
          surname: '',
          cpf: '',
          position: '',
          jerseyNumber: ''
        });
        setShowAddForm(false);
        fetchDados();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Falha ao adicionar time.');
      }
    } catch (error) {
      console.error('Erro ao adicionar time:', error);
      setError('Erro de conexão ao adicionar time.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoTime(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center pt-16">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20"> {/* Adicionado padding-top */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-500">
          Painel Administrativo
        </h1>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-6 text-center">
            {error}
            <button 
              onClick={fetchDados}
              className="ml-4 bg-red-700 hover:bg-red-800 py-1 px-3 rounded"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-6 text-center">
            {success}
          </div>
        )}

        {/* Abas de Navegação */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('times')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'times' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Times ({times.length})
          </button>
          <button
            onClick={() => setActiveTab('jogadores')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'jogadores' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Jogadores ({jogadores.length})
          </button>
          <button
            onClick={() => setActiveTab('adicionar')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'adicionar' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Adicionar Time
          </button>
        </div>

        {/* Conteúdo das Abas */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          
          {/* Aba: Times */}
          {activeTab === 'times' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Gerenciar Times</h2>
              
              {times.length === 0 ? (
                <p className="text-center text-gray-400">Nenhum time cadastrado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-600">
                      <tr>
                        <th className="py-3 px-4 text-left">Nome do Time</th>
                        <th className="py-3 px-4 text-left">Capitã</th>
                        <th className="py-3 px-4 text-left">CPF</th>
                        <th className="py-3 px-4 text-left">Jogadores</th>
                        <th className="py-3 px-4 text-left">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {times.map((time) => {
                        const jogadoresTime = jogadores.filter(j => j.teamName === time.teamName);
                        return (
                          <tr key={time.id} className="border-b border-gray-600 hover:bg-gray-650">
                            <td className="py-3 px-4 font-semibold">{time.teamName}</td>
                            <td className="py-3 px-4">{time.name} {time.surname}</td>
                            <td className="py-3 px-4">{time.cpf}</td>
                            <td className="py-3 px-4">
                              <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-sm">
                                {jogadoresTime.length + 1} jogadores
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleDeleteTeam(time.id)}
                                className="bg-red-500 hover:bg-red-600 transition duration-300 text-white font-bold py-2 px-4 rounded mr-2"
                              >
                                Excluir
                              </button>
                              <button
                                className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                  setActiveTab('jogadores');
                                  // Filtra jogadores deste time
                                }}
                              >
                                Ver Jogadores
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Aba: Jogadores */}
          {activeTab === 'jogadores' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Gerenciar Jogadores</h2>
              
              {jogadores.length === 0 ? (
                <p className="text-center text-gray-400">Nenhum jogador cadastrado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-600">
                      <tr>
                        <th className="py-3 px-4 text-left">Nome</th>
                        <th className="py-3 px-4 text-left">Time</th>
                        <th className="py-3 px-4 text-left">Posição</th>
                        <th className="py-3 px-4 text-left">Número</th>
                        <th className="py-3 px-4 text-left">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jogadores.map((jogador) => (
                        <tr key={jogador.id} className="border-b border-gray-600 hover:bg-gray-650">
                          <td className="py-3 px-4">{jogador.name} {jogador.surname}</td>
                          <td className="py-3 px-4 font-semibold">{jogador.teamName}</td>
                          <td className="py-3 px-4">{jogador.position}</td>
                          <td className="py-3 px-4">#{jogador.jerseyNumber}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleDeletePlayer(jogador.id)}
                              className="bg-red-500 hover:bg-red-600 transition duration-300 text-white font-bold py-2 px-4 rounded"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Aba: Adicionar Time */}
          {activeTab === 'adicionar' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Adicionar Novo Time</h2>
              
              <form onSubmit={handleAddTeam} className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome do Time *
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={novoTime.teamName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Nome do time"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      URL da Foto do Time
                    </label>
                    <input
                      type="url"
                      name="teamPhotoUrl"
                      value={novoTime.teamPhotoUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="https://exemplo.com/foto.jpg"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <h3 className="text-lg font-semibold text-pink-400 mb-4">Dados da Capitã</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={novoTime.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Nome da capitã"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Sobrenome *
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={novoTime.surname}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Sobrenome"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        CPF *
                      </label>
                      <input
                        type="text"
                        name="cpf"
                        value={novoTime.cpf}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="000.000.000-00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Posição *
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={novoTime.position}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Posição que joga"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Número da Camisa *
                      </label>
                      <input
                        type="number"
                        name="jerseyNumber"
                        value={novoTime.jerseyNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center mt-8">
                  <button
                    type="submit"
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                  >
                    Adicionar Time
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setNovoTime({
                      teamName: '',
                      teamPhotoUrl: '',
                      name: '',
                      surname: '',
                      cpf: '',
                      position: '',
                      jerseyNumber: ''
                    })}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                  >
                    Limpar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;