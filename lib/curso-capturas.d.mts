export type CapturaEspanhol = {
  foto: string;
  destaques: { x: number; y: number; w: number; h: number; rotulo: string; tipo: "seta" | "caixa" | "numero" }[];
  clicar: { x: number; y: number; w: number; h: number } | null;
  versao: string;
  capturado_em: string;
  commit_fonte: string;
  idioma: "es";
};

export type ManifestoCapturasEspanhol = {
  idioma: "es";
  commit_fonte: string;
  versao: string;
  gerado_em: string;
  largura: number;
  altura: number;
  capturas: Record<string, CapturaEspanhol>;
  falhas: [];
};

export function lerCapturasEspanhol(raiz?: string | URL, dados?: unknown): ManifestoCapturasEspanhol | null;
