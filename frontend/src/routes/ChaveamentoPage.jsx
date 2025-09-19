import React, { useState, useEffect, useRef } from 'react';

// Função para embaralhar o array de times
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Componente para exibir um card de time no chaveamento
const TeamMatchCard = ({ team }) => {
  return (
    <div className="flex items-center space-x-1 py-1 px-2 rounded-md bg-gray-800 border border-gray-700 min-w-[140px]">
      {team ? (
        <>
          {/* O quadrado agora é uma imagem */}
          {team.teamPhotoUrl ? (
            <img src={team.teamPhotoUrl} alt={`${team.teamName || team.name} logo`} className="w-5 h-5 object-cover rounded-sm" />
          ) : (
            <div className="w-5 h-5 bg-gray-600 rounded-sm"></div>
          )}
          <span className="text-white font-semibold text-xs">{team.teamName || team.name}</span>
        </>
      ) : (
        <span className="text-gray-400 text-xs italic">Vaga</span>
      )}
    </div>
  );
};
// Componente para uma única partida (dois times e a linha de conexão)
const Match = ({ team1, team2, isFinal = false, isSemi = false }) => {
  let connectorHeight = 'h-[40px]'; // Padrão
  if (isSemi) connectorHeight = 'h-[90px]'; // Para semi para final
  if (isFinal) connectorHeight = 'h-[0px]'; // Não tem conector para a final

  return (
    <div className="flex items-center">
      <div className="flex flex-col space-y-1">
        <TeamMatchCard team={team1} />
        <TeamMatchCard team={team2} />
      </div>
      {/* Linhas de conexão que afunilam */}
      {!isFinal && (
        <div className={`relative w-6 ${connectorHeight}`}>
          <div className="absolute top-0 left-0 w-[2px] h-[calc(50%+1px)] bg-gray-600"></div>
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-600"></div>
          <div className="absolute bottom-0 left-0 w-[2px] h-[calc(50%+1px)] bg-gray-600"></div>
        </div>
      )}
    </div>
  );
};

// Funções de renderização de cada rodada
const renderRound = (teams, phase) => {
  let spaceY = 'space-y-8'; // Oitavas
  if (phase === 'quartas') spaceY = 'space-y-24'; // Quartas
  if (phase === 'semi') spaceY = 'space-y-[135px]'; // Semi

  return (
    <div className={`flex flex-col ${spaceY}`}>
      {[...Array(teams.length / 2)].map((_, i) => (
        <Match 
          key={i} 
          team1={teams[i * 2]} 
          team2={teams[i * 2 + 1]} 
          isSemi={phase === 'semi'}
        />
      ))}
    </div>
  );
};

const ChaveamentoPage = () => {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chaveamentoRef = useRef(null); // Referência para a seção do chaveamento

  const handleScrollToChaveamento = () => {
    chaveamentoRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/inscricoes');
        if (!response.ok) {
          throw new Error('Falha ao carregar os times.');
        }
        const data = await response.json();
        const timesInscritos = data.slice(0, 16);
        const timesEmbaralhados = shuffleArray(timesInscritos);
        setTimes(timesEmbaralhados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTimes();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl">Carregando chaveamento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-500">Erro: {error}</p>
      </div>
    );
  }

  const oitavasTimes = Array(16).fill(null).map((_, i) => times[i] || null);
  const quartasTimes = Array(8).fill(null);
  const semiTimes = Array(4).fill(null);
  const finalTimes = Array(2).fill(null);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Seção de introdução (Hero Section) */}
      <div 
        className="relative flex items-center justify-center text-center p-8 md:p-16 h-screen bg-cover bg-center" 
        style={{ backgroundImage: " url('/fotofundochaveamento.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Chaveamento da Copa</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Acompanhe rolando a página para baixo ou clicando aqui!
          </p>
          <button 
            onClick={handleScrollToChaveamento} 
            className="bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out text-white font-bold py-3 px-8 rounded-full shadow-lg"
          >
            Ver Chaveamento
          </button>
        </div>
      </div>
      
      {/* Seção do Chaveamento (onde você rola para baixo) */}
      <div ref={chaveamentoRef} className="container mx-auto px-4 py-8 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-500">
          Veja o progresso dos times!
        </h2>
        
        {/* Estrutura do Diagrama */}
        <div className="flex justify-center items-center">
          
          {/* Lado Esquerdo do Chaveamento */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Oitavas</h2>
            {renderRound(oitavasTimes.slice(0,8), 'oitavas')}
          </div>
          
          <div className="flex flex-col items-center ml-12 mr-12">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Quartas</h2>
            {renderRound(quartasTimes.slice(0,4), 'quartas')}
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Semi</h2>
            {renderRound(semiTimes.slice(0,2), 'semi')}
          </div>
          
          {/* Centro: Final e Campeão */}
          <div className="flex flex-col items-center mx-6 ">
            <h2 className="text-xl font-bold text-pink-500 mb-1">FINAL</h2>
            <Match team1={finalTimes[0]} team2={finalTimes[1]} isFinal={true} />
            <div className="mt-8 text-xl font-bold text-yellow-400">CAMPEÃO</div>
          </div>

          {/* Lado Direito do Chaveamento */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Semi</h2>
            {renderRound(semiTimes.slice(2,4), 'semi')}
          </div>
          
          <div className="flex flex-col items-center ml-12 mr-12">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Quartas</h2>
            {renderRound(quartasTimes.slice(4,8), 'quartas')}
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Oitavas</h2>
            {renderRound(oitavasTimes.slice(8,16), 'oitavas')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChaveamentoPage;