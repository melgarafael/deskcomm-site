// QA real no navegador. PLAYWRIGHT_PACKAGE permite usar a instalação isolada de QA.
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || "playwright");
const assert = require("node:assert/strict");
const { writeFileSync } = require("node:fs");
const path = require("node:path");
const base = process.env.QA_BASE_URL || "http://localhost:3318";
const pasta = __dirname;
const rotas = { "pt-BR": "/curso", en: "/en/course", es: "/es/curso" };

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.QA_CHROME_PATH ? { executablePath: process.env.QA_CHROME_PATH } : {}) });
  const contexto = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light" });
  const page = await contexto.newPage();
  const erros = [], falhasDeImagem = [], medidas = [], jornadas = [];
  page.on("pageerror", (e) => erros.push(e.message));
  page.on("response", (r) => { if (r.status() >= 400 && /\/curso\/capturas\//.test(r.url())) falhasDeImagem.push(r.url()); });
  const ir = async (rota) => {
    await page.goto(base + rota);
    await page.locator("#vista h1").waitFor();
    await page.evaluate(() => document.fonts.ready);
  };
  const hash = async (h) => {
    await page.evaluate((valor) => { location.hash = valor; }, h);
    await page.waitForFunction((valor) => location.hash === valor, h);
    await page.waitForTimeout(70); // aguarda o render síncrono disparado pelo hashchange
  };
  const foto = async (nome) => page.screenshot({ path: path.join(pasta, `${nome}.png`), fullPage: false });
  try {
    for (const [idioma, rota] of Object.entries(rotas)) {
      await ir(rota);
      assert.equal(await page.locator("html").getAttribute("lang"), idioma);
      assert.equal(await page.locator('.idiomas-curso [aria-current="page"]').textContent(), idioma === "pt-BR" ? "PT" : idioma.toUpperCase());
      const dados = await page.locator("#dados").evaluate((s) => JSON.parse(s.textContent));
      for (const width of [360, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const medida = await page.evaluate(() => ({
          largura: innerWidth, documento: document.documentElement.scrollWidth,
          links: [...document.querySelectorAll(".idiomas-curso a")].map((a) => ({ texto: a.textContent, esquerda: a.getBoundingClientRect().left, direita: a.getBoundingClientRect().right })),
        }));
        assert.ok(medida.documento <= width + 1, `${idioma}: overflow em ${width}`);
        assert.ok(medida.links.every((a) => a.esquerda >= 0 && a.direita <= width), `${idioma}: idiomas cortados`);
        medidas.push({ idioma, ...medida });
        if (width === 390 || width === 1440) await foto(`${idioma}-inicio-${width}`);
      }
      const m = dados.modulos[0], l = m.licoes[0];
      await page.locator(`.acoes a[href="#l.${m.id}.${l.id}"]`).first().click();
      await page.waitForFunction((titulo) => document.querySelector("#vista h1")?.textContent === titulo, l.titulo);
      assert.equal(await page.locator("#vista h1").textContent(), l.titulo);
      assert.equal(await page.locator(".passo").count(), l.passos.length);
      await page.locator(".passo .tela img").first().evaluate((img) => img.decode());
      await foto(`${idioma}-licao`);
      await page.locator(".passo .tela").first().click();
      assert.equal(await page.locator("#ampliada").evaluate((d) => d.open), true);
      await page.locator("[data-fechar]").click();
      await page.locator("#marcar-feita").click();
      assert.ok((await page.evaluate(() => JSON.parse(localStorage.getItem("curso-deskcomm:feitos")))).includes(`${m.id}/${l.id}`));
      const outra = idioma === "en" ? "es" : "en";
      const aberta = `#l.${m.id}.${l.id}`;
      assert.equal(await page.locator(`[data-idioma-curso="${rotas[outra]}"]`).getAttribute("href"), rotas[outra] + aberta);
      await page.locator(`[data-idioma-curso="${rotas[outra]}"]`).click();
      await page.locator("#marcar-feita").waitFor();
      assert.equal(new URL(page.url()).hash, aberta);
      assert.ok((await page.evaluate(() => JSON.parse(localStorage.getItem("curso-deskcomm:feitos")))).includes(`${m.id}/${l.id}`));
      assert.ok(await page.locator(`.sublicoes a[href="${aberta}"] .feito`).count());
      await ir(rota + `#s.${m.id}.${l.id}`);
      for (let i = 0; i < l.passos.length; i++) {
        assert.equal(await page.locator("#simulador h2").textContent(), l.passos[i].titulo);
        const hotspot = page.locator('[data-sim="acertou"]');
        if (await hotspot.count()) await hotspot.click();
        else await page.locator('[data-sim="avancar"]').click();
      }
      await page.locator('[data-sim="reiniciar"]').waitFor();
      await page.locator('[data-sim="reiniciar"]').click();
      assert.equal(await page.locator("#simulador h2").textContent(), l.passos[0].titulo);
      const busca = idioma === "en" ? "internal note" : "nota interna";
      await page.locator("#busca").fill(busca);
      await page.locator("#resultados a").first().waitFor();
      const resultado = await page.locator("#resultados a").first().textContent();
      assert.ok(resultado?.length);
      await page.locator("#busca").press("Enter");
      assert.ok(new URL(page.url()).hash.startsWith("#l."));
      await page.locator("#busca").fill("zzzznotfound123");
      await page.locator(".res-vazio").waitFor();
      if (idioma === "en") assert.match(await page.locator(".res-vazio").textContent(), /No results/);
      if (idioma === "es") assert.match(await page.locator(".res-vazio").textContent(), /No se encontraron/);
      await page.locator("#busca").fill("");
      await page.locator("#busca").press("Escape");
      await hash("#acao");
      const n = dados.nichos[0], j = n.jornadas[0];
      await page.locator(`#vista a[href="#acao.${n.id}"]`).click();
      await page.locator(`#vista a[href="#demo.${n.id}.${j.id}.${j.cenas[0].id}"]`).first().click();
      await page.waitForFunction((titulo) => document.querySelector("#demo-titulo-pagina")?.textContent === titulo, j.titulo);
      assert.equal(await page.locator("#demo-titulo-pagina").textContent(), j.titulo);
      assert.ok((await page.locator(".jornada-voz").first().textContent()).includes(j.cenas[0].cliente));
      await page.locator(".jornada-foto img").evaluate((img) => img.decode());
      await foto(`${idioma}-demonstracao`);
      await page.keyboard.press("ArrowRight");
      assert.ok(new URL(page.url()).hash.endsWith("." + j.cenas[1].id));
      await page.locator(`.alternador a[href="#montagem.${n.id}.${j.id}"]`).click();
      assert.ok((await page.locator(".jornada-requisitos").textContent()).includes(j.dependencias));
      assert.equal(await page.locator('#vista .cartao[href^="#l."]').count(), j.montagem.length);
      // Menu no celular e tema escuro também preservam acesso aos idiomas.
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator("#botao-menu").click();
      assert.equal(await page.locator("#botao-menu").getAttribute("aria-expanded"), "true");
      await page.locator('#menu a[href="#m.inbox"]').click();
      await page.waitForFunction(() => document.querySelector("#botao-menu").getAttribute("aria-expanded") === "false");
      assert.equal(await page.locator("#botao-menu").getAttribute("aria-expanded"), "false");
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.emulateMedia({ colorScheme: "dark" });
      await foto(`${idioma}-celular-escuro`);
      await page.emulateMedia({ colorScheme: "light" });
      jornadas.push({ idioma, modulos: dados.modulos.length, licoes: dados.modulos.reduce((n, m) => n + m.licoes.length, 0), demonstracoes: dados.nichos.reduce((n, x) => n + x.jornadas.length, 0), busca, resultado, simulador: "concluído", trocaDeIdioma: "aula e progresso preservados" });
    }
    // Acessos reais da home, incluindo header e seção, abrem o curso no idioma escolhido.
    for (const [idioma, home] of [["pt-BR", "/"], ["en", "/en"], ["es", "/es"]]) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(base + home);
      await page.locator(`header a[href="${rotas[idioma]}"]`).waitFor();
      assert.ok(await page.locator(`footer a[href="${rotas[idioma]}"]`).count());
      await page.locator(`header a[href="${rotas[idioma]}"]`).click();
      await page.locator("#vista h1").waitFor();
      assert.equal(await page.locator("html").getAttribute("lang"), idioma);
    }
    assert.deepEqual(erros, []);
    assert.deepEqual(falhasDeImagem, []);
    const relatorio = { base, data: new Date().toISOString(), medidas, jornadas, erros, falhasDeImagem };
    writeFileSync(path.join(pasta, "resultado.json"), JSON.stringify(relatorio, null, 2) + "\n");
    process.stdout.write(JSON.stringify({ sucesso: true, larguras: medidas.length, jornadas, erros, falhasDeImagem }, null, 2) + "\n");
  } finally { await browser.close(); }
})().catch((e) => { process.stderr.write(e.stack + "\n"); process.exitCode = 1; });
