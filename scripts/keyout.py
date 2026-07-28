#!/usr/bin/env python3
"""
Recorta o fundo creme das imagens 3D geradas, deixando alpha.

Uso:
    python3 scripts/keyout.py entrada.png public/img/saida.png [--tol 6]

POR QUE PREENCHIMENTO A PARTIR DAS BORDAS, e não casamento de cor global:
o tampo da mesa e as peças claras têm pixels quase idênticos ao fundo. Casar cor
globalmente abre buracos DENTRO do objeto — invisíveis quando a imagem é composta
sobre o mesmo creme da página, e escancarados no instante em que ela vira camada
sobre outra coisa. Que é justamente o uso previsto no scrollytelling.

Preenchimento a partir das bordas só remove o que está conectado ao fundo externo.
Buraco interno permanece opaco, porque não alcança a borda.
"""

import sys
from collections import deque

from PIL import Image

CREME = (250, 249, 246)  # #faf9f6 — fundo da página


def recortar(origem: str, destino: str, tol: int = 6) -> None:
    im = Image.open(origem).convert("RGBA")
    largura, altura = im.size
    px = im.load()

    def e_fundo(x: int, y: int) -> bool:
        r, g, b, _ = px[x, y]
        return (
            abs(r - CREME[0]) <= tol
            and abs(g - CREME[1]) <= tol
            and abs(b - CREME[2]) <= tol
        )

    visitado = bytearray(largura * altura)
    fila: deque[tuple[int, int]] = deque()

    # Semeia em todos os pixels de borda que já são fundo.
    for x in range(largura):
        for y in (0, altura - 1):
            if not visitado[y * largura + x] and e_fundo(x, y):
                visitado[y * largura + x] = 1
                fila.append((x, y))
    for y in range(altura):
        for x in (0, largura - 1):
            if not visitado[y * largura + x] and e_fundo(x, y):
                visitado[y * largura + x] = 1
                fila.append((x, y))

    removidos = 0
    while fila:
        x, y = fila.popleft()
        r, g, b, _ = px[x, y]
        px[x, y] = (r, g, b, 0)
        removidos += 1
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < largura and 0 <= ny < altura:
                i = ny * largura + nx
                if not visitado[i] and e_fundo(nx, ny):
                    visitado[i] = 1
                    fila.append((nx, ny))

    im.save(destino)

    total = largura * altura
    bbox = im.getbbox()
    print(f"{origem.split('/')[-1]}  →  {destino}")
    print(f"  {largura}x{altura} · fundo removido: {removidos:,} px ({removidos / total * 100:.1f}%)")
    if bbox:
        print(f"  conteúdo: x {bbox[0]}–{bbox[2]} · vazio à esquerda: {bbox[0] / largura * 100:.0f}%")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    tolerancia = 6
    if "--tol" in sys.argv:
        tolerancia = int(sys.argv[sys.argv.index("--tol") + 1])
    if len(args) < 2:
        sys.exit("uso: keyout.py entrada.png saida.png [--tol N]")
    recortar(args[0], args[1], tolerancia)
