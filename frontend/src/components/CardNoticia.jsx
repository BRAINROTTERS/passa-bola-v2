export default function CardNoticia({ data, titulo, resumo, imagem, link }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl shadow-purple-300 transition ">
      <img src={imagem} alt={titulo} className="w-full h-48 object-cover " />
      <div className="p-4">
        <p className="text-pink-500 text-sm mb-2">{data}</p>
        <h3 className="font-bold text-lg mb-2 text-purple-500">{titulo}</h3>
        <p className="text-gray-600 text-sm mb-3">{resumo}</p>
        <a href={link} className="text-purple-600 font-medium hover:underline ">
          Ler mais →
        </a>
      </div>
    </div>
  );
}
