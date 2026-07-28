import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Viloes } from "@/components/Viloes";
import { Virada } from "@/components/Virada";
import { Jornada } from "@/components/Jornada";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Viloes />
        <Virada />
        <Jornada />
      </main>
    </>
  );
}
