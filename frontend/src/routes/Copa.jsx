import React, { useState, useRef } from 'react';

const Copa = () => {
  const formRef = useRef(null);
  const [enrollmentType, setEnrollmentType] = useState('join');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    cpf: '',
    position: '',
    jerseyNumber: '',
    teamName: '',
    teamPhoto: null,
  });

  const handleScrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Constrói o objeto de dados com base no tipo de inscrição
    const dataToSend = enrollmentType === 'create' ? {
      ...formData,
      teamName: formData.teamName,
      isNewTeam: true
    } : {
      ...formData,
      isNewTeam: false
    };

    try {
      const response = await fetch('http://localhost:3000/api/inscricoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Inscrição enviada com sucesso!');
        // Opcional: Limpar formulário
        setFormData({
          name: '',
          surname: '',
          cpf: '',
          position: '',
          jerseyNumber: '',
          teamName: '',
          teamPhoto: null,
        });
      } else {
        alert('Falha ao enviar inscrição.');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Seção de introdução da Copa */}
      <div 
        className="relative flex items-center justify-center text-center p-8 md:p-16 h-[60vh] md:h-[80vh] bg-cover bg-center" 
        style={{ backgroundImage: "url('/fotofundocopa.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Copa Passa Bola</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Participe do torneio de futebol feminino fut-7 da Passa Bola! Junte-se a uma comunidade de jogadoras e mostre seu talento em campo. Inscrições abertas para times e jogadoras solo.
          </p>
          <button 
            onClick={handleScrollToForm} 
            className="bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out text-white font-bold py-3 px-8 rounded-full shadow-lg"
          >
            Inscrever-se na Copa
          </button>
        </div>
      </div>

      {/* Seção do Formulário de Inscrição */}
      <div ref={formRef} className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-pink-500">
          Formulário de Inscrição
        </h2>
        
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 md:p-10 rounded-xl shadow-lg max-w-3xl mx-auto">
          {/* Seletor de Tipo de Inscrição */}
          <div className="mb-6 flex justify-center space-x-4">
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                className="form-radio text-pink-500 h-4 w-4" 
                name="enrollmentType" 
                value="join" 
                checked={enrollmentType === 'join'} 
                onChange={() => setEnrollmentType('join')} 
              />
              <span className="ml-2 text-white">Quero me juntar a um time</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                className="form-radio text-pink-500 h-4 w-4" 
                name="enrollmentType" 
                value="create" 
                checked={enrollmentType === 'create'} 
                onChange={() => setEnrollmentType('create')} 
              />
              <span className="ml-2 text-white">Quero criar um time</span>
            </label>
          </div>

          {/* Campos para Juntar a um Time */}
          {enrollmentType === 'join' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nome" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Sobrenome" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
              </div>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Posição que joga" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
                <input type="number" name="jerseyNumber" value={formData.jerseyNumber} onChange={handleChange} placeholder="Número da Camisa" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Escolha seu time:</label>
                <select name="teamName" value={formData.teamName} onChange={handleChange} className="form-select bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required>
                  <option value="">-- Selecione um time --</option>
                  <option value="Time A">Time A - As Guerreiras</option>
                  <option value="Time B">Time B - Estrelas do Fut</option>
                  <option value="Time C">Time C - As Feras</option>
                </select>
              </div>
            </div>
          )}

          {/* Campos para Criar um Time */}
          {enrollmentType === 'create' && (
            <div className="space-y-4">
              <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} placeholder="Nome do seu novo time" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">URL da Foto do time:</label>
                <input type="url" name="teamPhotoUrl" value={formData.teamPhotoUrl} onChange={handleChange} placeholder="https://exemplo.com/logo.png" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" />
              </div>
              <p className="text-gray-400 mt-6 font-bold">Dados da Capitã (Você):</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nome" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Sobrenome" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
              </div>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Posição que joga" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
                <input type="number" name="jerseyNumber" value={formData.jerseyNumber} onChange={handleChange} placeholder="Número da Camisa" className="form-input bg-gray-700 text-white border border-gray-600 rounded-lg p-3 w-full" required />
              </div>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <button 
              type="submit" 
              className="bg-pink-500 hover:bg-pink-600 transition duration-300 ease-in-out text-white font-bold py-3 px-10 rounded-full shadow-lg"
            >
              Enviar Inscrição
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Copa;