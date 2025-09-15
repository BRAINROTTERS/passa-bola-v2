export default function SobreContato() {
  return (
    <div className="bg-black text-white">
      {/* SOBRE */}
      
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-cover 
      " style={{ backgroundImage: "url('/imagemfundosobrepassaabola.jpg')" }}>
        
        <h1 className="text-4xl md:text-5xl font-bold surge-text">
          Conheça um pouco mais <span className="text-pink-500">sobre nós!</span>
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg text-gray-300 surge-text">
          O <span className="text-purple-400">Passa a Bola</span> nasceu para trazer notícias,
          análises e destaques do futebol feminino, mostrando sua força e inspiração.
        </p>
      </section>

      {/* CONTATO */}
      <section className="min-h-screen flex flex-col justify-center px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Entre em contato <span className="text-blue-400">conosco</span> por aqui!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-pink-400">E-mail</h3>
              <p className="text-gray-300">seu.email@exemplo.com</p>
              <p className="text-sm text-gray-500">Resposta em até 24h</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-purple-400">Telefone</h3>
              <p className="text-gray-300">(XX) XXXXX-XXXX</p>
              <p className="text-sm text-gray-500">WhatsApp disponível</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-blue-400">Localização</h3>
              <p className="text-gray-300">Sua Cidade, UF</p>
              <p className="text-sm text-gray-500">Disponível para remoto</p>
            </div>
          </div>

          <form className="bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text" placeholder="Nome"
                className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
              />
              <input
                type="text" placeholder="Sobrenome"
                className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              />
            </div>

            <input
              type="email" placeholder="E-mail"
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />

            <input
              type="text" placeholder="Assunto"
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
            />

            <textarea
              rows="5" placeholder="Mensagem"
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
