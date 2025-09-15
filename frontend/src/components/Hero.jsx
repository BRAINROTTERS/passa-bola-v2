export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/imagemfundopassaabola.jpg')" }}
    >
      {/* Overlay escuro para dar contraste */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Conteúdo */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold surge-text">
          Bem-vinda ao <span className="text-pink-500">Passa Bola</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl surge-text">
          Acompanhe as últimas notícias e destaques do esporte que mais cresce no mundo
        </p>
      </div>
    </section>
  );
}
