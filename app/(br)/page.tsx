import { Pagina } from "@/components/Pagina";
import { CONTEUDO } from "@/conteudo";

export default function Home() {
  return <Pagina c={CONTEUDO["pt-BR"]} idioma="pt-BR" />;
}
