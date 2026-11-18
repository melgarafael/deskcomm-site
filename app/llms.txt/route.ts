import { gerarLlmsTxt } from "@/lib/llms";

// Gerado no build: o conteúdo só muda quando o dicionário ou as rotas mudam.
export const dynamic = "force-static";

export function GET() {
  return new Response(gerarLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
