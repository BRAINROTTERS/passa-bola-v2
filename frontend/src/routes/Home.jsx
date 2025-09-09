import Hero from "../components/Hero";
import Noticias from "../components/Noticias";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <section className="p-8">
        
        <div className="mt-6">
          <Noticias />
        </div>
      </section>
    </div>
  );
}
