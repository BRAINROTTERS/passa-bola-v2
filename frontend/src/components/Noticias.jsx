import CardNoticia from "./CardNoticia";
import imagemnoticia1 from "../assets/imagemnoticia1.jpg";
import imagemnoticia2 from "../assets/imagemnoticia2.jpg";
import imagemnoticia3 from "../assets/imagemnoticia3.jpg";

const noticias = [
  {
    id: 1,
    data: "17 AGO 2025",
    titulo: "Atlético-PI fatura Série A3 do Brasileiro Feminino",
    resumo: "CAP goleia Vila Nova e leva a taça do torneio...",
    imagem: imagemnoticia1,
    link: "https://ge.globo.com/pi/futebol/noticia/2025/08/17/atletico-pi-fatura-serie-a3-do-brasileiro-feminino-e-se-sagra-1o-campeao-brasileiro-de-2025.ghtml"
  },
  {
    id: 2,
    data: "18 AGO 2025",
    titulo: "Amanda Gutierres dispara na artilharia do Brasileirão",
    resumo: "Veja os números da atacante do Palmeiras...",
    imagem: imagemnoticia2,
    link: "https://ge.globo.com/futebol/futebol-feminino/brasileiro-feminino/noticia/2025/08/18/indicada-a-bola-de-ouro-amanda-gutierres-tem-larga-vantagem-na-artilharia-do-brasileiro-feminino.ghtml"
  },
  {
    id: 3,
    data: "18 AGO 2025",
    titulo: "Quem é Taina Maranhão? A nova joia do Palmeiras",
    resumo: "Atacante de 21 anos marcou três gols contra o Flamengo...",
    imagem: imagemnoticia3,
    link: "https://ge.globo.com/futebol/times/palmeiras/noticia/2025/08/18/quem-e-taina-maranhao-filha-de-ex-jogador-largou-a-ginastica-antes-de-virar-destaque-do-palmeiras.ghtml"
  }
];

export default function Noticias() {
  return (
    <section id="noticias" className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">
        Últimas Notícias
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {noticias.map((noticia) => (
          <CardNoticia key={noticia.id} {...noticia} />
        ))}
      </div>
    </section>
  );
}
