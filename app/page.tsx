import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Viloes } from "@/components/Viloes";
import { Virada } from "@/components/Virada";
import { Jornada } from "@/components/Jornada";
import { Instalar } from "@/components/Instalar";
import { Preco } from "@/components/Preco";
import { BannerHostGator } from "@/components/BannerHostGator";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Viloes />
        <Virada />
        <Jornada />
        <Instalar />
        <Preco />
        <BannerHostGator />
      </main>
    </>
  );
}
