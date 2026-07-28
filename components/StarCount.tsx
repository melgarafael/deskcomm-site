/**
 * Contador de estrelas do repositório, buscado no servidor.
 *
 * Nunca hardcoded: número escrito à mão apodrece e, em projeto que cresce, passa
 * a mostrar MENOS do que a realidade — prova social trabalhando contra.
 * Revalida de hora em hora; se a API falhar, o componente some em vez de exibir
 * zero ou um número velho.
 */
export async function StarCount() {
  let estrelas: number | null = null;
  try {
    const r = await fetch("https://api.github.com/repos/melgarafael/DeskcommCRM", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (r.ok) estrelas = (await r.json()).stargazers_count ?? null;
  } catch {
    estrelas = null;
  }

  if (estrelas === null) return null;

  return (
    <span className="font-mono text-xs tabular-nums text-text-muted">
      {estrelas.toLocaleString("pt-BR")}
    </span>
  );
}
