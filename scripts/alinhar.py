#!/usr/bin/env python3
"""
Alinha as cenas do scrollytelling contra a cena base.

POR QUE PRECISA: o gerador recompõe cada cena. Num sticky onde a imagem troca sem
sair da tela, alguns pixels de deslocamento fazem a mesa PULAR a cada passo — e o
efeito de "a mesa evolui" morre. Nos cartões isso passaria; aqui não.

MÉTODO: correlação de fase (FFT). Compara a cena inteira com a base e devolve o
deslocamento (dx, dy) que maximiza a similaridade. Não depende de escolher uma
peça-âncora à mão — o que seria frágil, porque cada estado muda peças diferentes.
"""

import sys

import numpy as np
from PIL import Image

CREME = (250, 249, 246)


def _cinza(caminho: str, tamanho: tuple[int, int]) -> np.ndarray:
    im = Image.open(caminho).convert("RGBA")
    fundo = Image.new("RGBA", im.size, (*CREME, 255))
    fundo.alpha_composite(im)
    return np.asarray(fundo.convert("L").resize(tamanho, Image.BILINEAR), dtype=float)


def deslocamento(base: str, alvo: str, amostra: tuple[int, int] = (512, 288)) -> tuple[int, int]:
    a, b = _cinza(base, amostra), _cinza(alvo, amostra)
    a = a - a.mean()
    b = b - b.mean()
    fa, fb = np.fft.fft2(a), np.fft.fft2(b)
    cruz = fa * np.conj(fb)
    mag = np.abs(cruz)
    mag[mag == 0] = 1e-9
    corr = np.fft.ifft2(cruz / mag).real
    pico = np.unravel_index(np.argmax(corr), corr.shape)
    dy, dx = pico
    if dy > amostra[1] // 2:
        dy -= amostra[1]
    if dx > amostra[0] // 2:
        dx -= amostra[0]
    # Converte do espaço da amostra para o da imagem original.
    largura_real = Image.open(base).size[0]
    escala = largura_real / amostra[0]
    return int(round(dx * escala)), int(round(dy * escala))


if __name__ == "__main__":
    base = sys.argv[1]
    for alvo in sys.argv[2:]:
        dx, dy = deslocamento(base, alvo)
        nome = alvo.split("/")[-1]
        print(f"{nome:26s} deslocamento vs base: dx={dx:+5d}  dy={dy:+5d}")


def aplicar(base: str, alvo: str) -> None:
    """Desloca `alvo` para casar com `base`, preservando o tamanho da tela."""
    dx, dy = deslocamento(base, alvo)
    if dx == 0 and dy == 0:
        print(f"  {alvo.split('/')[-1]}: já alinhada")
        return
    im = Image.open(alvo).convert("RGBA")
    novo = Image.new("RGBA", im.size, (0, 0, 0, 0))
    novo.paste(im, (dx, dy))
    novo.save(alvo)
    print(f"  {alvo.split('/')[-1]}: deslocada dx={dx:+d} dy={dy:+d}")
