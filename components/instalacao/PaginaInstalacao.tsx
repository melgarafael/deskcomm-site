import type { ReactNode } from "react";

import { CONTEUDO } from "@/conteudo";
import { COMANDOS_INSTALACAO as CMD, ETAPAS_INSTALACAO, INSTALACAO_ATUALIZADA_EM, LINKS_INSTALACAO as LINKS, NOTION_ORIGINAL } from "@/conteudo/instalacao";
import { CURSO } from "@/conteudo/rotas";

import { Cabecalho, GITHUB } from "../Cabecalho";
import { Comando } from "../guias/Interativos";
import { Rodape } from "../Rodape";
import { ProgressoInstalacao } from "./Progresso";

function Link({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="font-bold text-accent-700 underline decoration-accent-200 underline-offset-4 hover:decoration-accent-700">{children}</a>;
}

function Codigo({ children }: { children: string }) {
  return <code className="break-words rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>;
}

function Copiar({ comando, conversa = false }: { comando: string; conversa?: boolean }) {
  return <Comando comando={comando} copiar="Copiar" copiado="Copiado!" selecionado="Texto selecionado. Use o atalho de copiar do seu dispositivo." escuro prefixo={conversa ? "›" : "$"} />;
}

function Aviso({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-accent-200 bg-accent-50 p-5">
      <p className="font-bold text-accent-800">{titulo}</p>
      <div className="mt-2 text-sm leading-relaxed text-accent-900">{children}</div>
    </aside>
  );
}

function Etapa({ numero, introducao, children, resultado }: { numero: number; introducao: string; children: ReactNode; resultado: string }) {
  const etapa = ETAPAS_INSTALACAO[numero - 1];
  const proxima = ETAPAS_INSTALACAO[numero];
  return (
    <section id={etapa.id} aria-labelledby={`titulo-${etapa.id}`} className="scroll-mt-24 border-t border-border py-10 first:border-t-0 first:pt-0 sm:py-14">
      <div className="flex items-start gap-4">
        <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-600 font-bold text-white">{numero}</span>
        <div className="min-w-0 pt-1">
          <h2 id={`titulo-${etapa.id}`} className="text-balance text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-[1.85rem]">{etapa.titulo}</h2>
          <p className="mt-3 max-w-[65ch] text-pretty leading-relaxed text-text-muted">{introducao}</p>
        </div>
      </div>
      <div className="mt-7 space-y-6 sm:pl-14">{children}</div>
      <div className="mt-8 flex flex-col gap-4 rounded-lg bg-surface-elevated p-4 sm:ml-14 sm:p-5">
        <p className="text-sm leading-relaxed"><span className="font-bold text-accent-700">Tudo certo quando: </span>{resultado}</p>
        {proxima ? <a href={`#${proxima.id}`} className="w-fit text-sm font-bold text-accent-700 underline decoration-accent-200 underline-offset-4">Próximo: {proxima.curto} →</a> : <a href={CURSO} className="inline-flex min-h-11 w-fit items-center rounded bg-accent-600 px-4 py-3 text-sm font-bold text-white hover:bg-accent-700">Próximo passo: começar o curso visual →</a>}
      </div>
    </section>
  );
}

function MapaDaInstalacao() {
  return (
    <div className="overflow-hidden rounded-2xl border border-accent-800 bg-accent-950 p-6 text-white sm:p-8">
      <p className="text-sm text-accent-200">O que você vai montar</p>
      <div className="mt-6 rounded-lg border border-accent-700 bg-accent-900 px-4 py-3">
        <p className="flex items-center gap-2 text-sm"><svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-accent-200" strokeWidth="1.5" aria-hidden><rect x="3" y="7" width="10" height="7" rx="2" /><path d="M5 7V5a3 3 0 0 1 6 0v2" /></svg>crm.suaempresa.com.br</p>
      </div>
      <div aria-hidden className="mx-auto h-7 w-px bg-accent-500" />
      <div className="rounded-xl bg-bg p-5 text-text">
        <p className="text-xs text-text-muted">Na sua VPS</p>
        <p className="mt-1 text-xl font-bold">Seu CRM, do seu jeito.</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-accent-800">
          {["Conversas", "Funil de vendas", "Agentes de IA"].map((t) => <span key={t} className="rounded border border-accent-200 bg-accent-50 px-2 py-1.5">{t}</span>)}
        </div>
      </div>
      <div aria-hidden className="mx-auto h-7 w-px bg-accent-500" />
      <div className="flex items-center justify-between gap-4 border-t border-accent-700 pt-4 text-sm">
        <span>WhatsApp <span className="block text-xs text-accent-200">Conectado por QR</span></span>
        <span className="text-right">Supabase <span className="block text-xs text-accent-200">Seu banco de dados</span></span>
      </div>
    </div>
  );
}

const PROBLEMAS = [
  { p: "Colei a senha ou o token e não apareceu nada", r: "É normal: o terminal esconde os campos secretos. Cole uma vez e pressione Enter. Nas perguntas do instalador, a confirmação “recebido” mostra quantos caracteres chegaram. Colar duas vezes junta os valores e pode invalidar a chave." },
  { p: "O Supabase recusou a criação do projeto", r: "Confira se o token é um Personal Access Token da conta, gerado na página do passo 3, e se continua válido. Confira também se a conta ainda pode criar um projeto no plano escolhido. Se já existe um banco com dados, use o caminho de projeto existente; não crie outro para tentar recuperar esses dados." },
  { p: "O site não abre ou está sem cadeado", r: "Confira se o registro A aponta para o IP da VPS e se as portas 80 e 443 estão liberadas no servidor e no painel da hospedagem. O domínio pode levar um tempo para propagar. Com Cloudflare, deixe “Somente DNS” até concluir a instalação. Aguarde a emissão do certificado e recarregue; não ignore o aviso de segurança do navegador." },
  { p: "A instalação parou. Preciso começar tudo de novo?", r: "Volte à pasta deskcommcrm e rode bash hostgator-setup-kit/install.sh novamente. Ele aproveita as respostas já salvas e permite corrigir os campos. O token pessoal não é salvo: se for necessário, informe-o de novo. Não apague a configuração nem os dados para recomeçar." },
  { p: "Apareceu “Network unreachable” no banco", r: "No caminho manual, a causa comum é usar a Direct connection do Supabase. Use Session pooler em modo URI, que aceita IPv4. O caminho com token do passo 3 descobre e testa a conexão automaticamente." },
  { p: "O QR code do WhatsApp expirou", r: "Abra Aparelhos conectados no celular antes de gerar o QR. Na tela do CRM, clique em “Gerar novo QR Code” e escaneie o novo código. Use o número que você quer dedicar ao atendimento." },
  { p: "Fiquei sem acesso por SSH depois de ativar o firewall", r: "Entre pelo console ou VNC no painel da hospedagem e libere a porta SSH correta. Uma VPS pode usar outra porta, além da padrão 22. Libere a porta que veio nos seus dados de acesso antes de ativar o firewall." },
] as const;

export function PaginaInstalacao() {
  const c = CONTEUDO["pt-BR"];
  return (
    <>
      <a href="#conteudo-instalacao" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent-700 focus:px-4 focus:py-3 focus:text-white">Pular para o guia</a>
      <Cabecalho c={c} idioma="pt-BR" pagina="instalacao" />
      <main id="conteudo-instalacao">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="pb-12 pt-7 sm:pb-16">
            <nav aria-label="Você está aqui" className="flex items-center gap-2 text-sm text-text-muted"><a href="/" className="hover:text-accent-700">Início</a><span aria-hidden>/</span><span aria-current="page">Guia de instalação</span></nav>
            <div className="mt-9 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-accent-700"><span aria-hidden className="h-2 w-2 rounded-full bg-accent-600" />Da VPS ao primeiro atendimento</p>
                <h1 className="mt-5 max-w-[19ch] text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.07] tracking-[-0.03em]">Seu CRM no ar.<br /><span className="text-accent-700">Um passo de cada vez.</span></h1>
                <p className="mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-text-muted">Do servidor ao WhatsApp conectado, este guia acompanha você na instalação do DeskcommCRM. Não precisa saber programar.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#antes-de-comecar" className="inline-flex min-h-12 items-center rounded bg-accent-600 px-5 text-sm font-bold text-white hover:bg-accent-700">Começar a instalação <span aria-hidden className="ml-4">↓</span></a>
                  <a href="#supabase" className="inline-flex min-h-12 items-center rounded border border-border px-4 text-sm font-bold hover:border-accent-300 hover:bg-accent-50">Já tenho VPS: ir ao Supabase →</a>
                </div>
                <p className="mt-5 text-sm text-text-muted">Software gratuito · Na sua VPS · Sem cobrança por usuário</p>
              </div>
              <MapaDaInstalacao />
            </div>
          </div>

          <section id="antes-de-comecar" aria-labelledby="titulo-preparo" className="scroll-mt-24 border-y border-border py-8 sm:py-10">
            <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
              <div><h2 id="titulo-preparo" className="text-xl font-bold">Antes de começar</h2><p className="mt-2 text-sm leading-relaxed text-text-muted">Deixe estes acessos por perto. Vamos usar cada um no seu momento.</p></div>
              <ul className="grid gap-5 sm:grid-cols-2">
                <li><p className="font-bold">VPS e domínio</p><p className="mt-1 text-sm leading-relaxed text-text-muted">Um servidor com 4 GB de RAM e o endereço que você quer usar. Os passos 1 e 4 ajudam com isso.</p><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold text-accent-700"><a href={LINKS.vps} rel="sponsored" className="inline-flex min-h-11 items-center underline decoration-accent-200 underline-offset-4 hover:decoration-accent-700">Contratar VPS ↗</a><a href={LINKS.dominio} rel="sponsored" className="inline-flex min-h-11 items-center underline decoration-accent-200 underline-offset-4 hover:decoration-accent-700">Registrar domínio ↗</a></div></li>
                <li><p className="font-bold">Conta no Supabase</p><p className="mt-1 text-sm leading-relaxed text-text-muted">O banco de dados. Vamos gerar um único token no passo 3; o instalador cuida do projeto.</p></li>
                <li><p className="font-bold">Celular com WhatsApp</p><p className="mt-1 text-sm leading-relaxed text-text-muted">Para ler o QR code e conectar o número de atendimento ao CRM.</p></li>
                <li><p className="font-bold">Chave de IA <span className="text-xs font-normal text-text-muted">opcional agora</span></p><p className="mt-1 text-sm leading-relaxed text-text-muted">OpenRouter, Anthropic ou OpenAI. Você pode instalar primeiro e cadastrar a chave depois.</p></li>
              </ul>
            </div>
            <p className="mt-7 text-sm leading-relaxed text-text-muted"><strong className="text-text">O que você paga:</strong> a hospedagem, o domínio e a IA que consumir. O software é gratuito, e o Supabase tem um plano grátis com limites próprios.</p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">Os links de VPS e domínio da HostGator são de parceria. Contratar por eles apoia o projeto.</p>
          </section>

          <div className="grid items-start gap-10 py-10 sm:py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-20"><ProgressoInstalacao /></aside>
            <div className="min-w-0">
              <Etapa numero={1} introducao="A VPS é o computador que mantém o seu CRM no ar, mesmo quando você fecha o seu notebook." resultado="você tem o IP do servidor, usuário, senha e porta de acesso SSH.">
                <p className="leading-relaxed">Na HostGator, escolha uma VPS com <strong>pelo menos 2 núcleos e 4 GB de RAM</strong>. A opção com Docker pronto simplifica a preparação. Se ele não estiver instalado, o instalador oferece instalar.</p>
                <a href={LINKS.vps} rel="sponsored" className="inline-flex min-h-11 items-center rounded bg-accent-600 px-4 text-sm font-bold text-white hover:bg-accent-700">Ver VPS na HostGator ↗</a>
                <p className="text-xs leading-relaxed text-text-muted">Link de parceria: contratar por ele apoia o projeto. Se precisar de um domínio, você também pode <a href={LINKS.dominio} rel="sponsored" className="underline underline-offset-4">registrá-lo na HostGator</a>.</p>
                <p className="leading-relaxed">Guarde os dados de acesso enviados pela hospedagem: <strong>IP, usuário, senha e porta SSH</strong>. Eles entram no próximo passo.</p>
                <Aviso titulo="Já tem uma VPS?">Pode seguir com ela se atender aos requisitos. Se já houver um painel ou proxy usando as portas do site, mantenha-o ligado: o instalador tem caminhos para trabalhar com ele.</Aviso>
              </Etapa>

              <Etapa numero={2} introducao="Você vai abrir o terminal do seu computador e entrar no servidor. A partir daí, os comandos rodam na VPS." resultado="o terminal mostra o usuário e o nome do servidor, depois de aceitar sua senha.">
                <p className="leading-relaxed">No <strong>Windows</strong>, abra o PowerShell. No <strong>Mac</strong> ou <strong>Linux</strong>, abra o Terminal. Troque <Codigo>SEU_IP</Codigo> pelo IP recebido e use o usuário informado pela hospedagem (geralmente <Codigo>root</Codigo>).</p>
                <Copiar comando={CMD.ssh} />
                <details className="rounded-lg border border-border bg-surface p-5"><summary className="cursor-pointer font-bold">Minha hospedagem informou uma porta diferente de 22</summary><div className="mt-4 space-y-3"><p className="text-sm leading-relaxed text-text-muted">Use o comando abaixo, substituindo <Codigo>SUA_PORTA</Codigo> pela porta informada.</p><Copiar comando={CMD.sshComPorta} /></div></details>
                <p className="leading-relaxed">Na primeira conexão, confira se o endereço é o da sua VPS. Se o terminal perguntar <Codigo>Are you sure you want to continue connecting?</Codigo>, digite <Codigo>yes</Codigo>. Depois, cole a senha e pressione Enter.</p>
                <Aviso titulo="A senha não aparece enquanto você digita">Nem bolinhas, nem asteriscos. Isso é normal: cole uma vez e pressione Enter. Se precisar colar, use Cmd+V no Mac, o botão direito no PowerShell ou Ctrl+Shift+V no Linux.</Aviso>
                <details className="rounded-lg border border-border bg-surface p-5"><summary className="cursor-pointer font-bold">Portas e firewall: confira antes de continuar</summary><div className="mt-3 space-y-3 text-sm leading-relaxed text-text-muted"><p>As portas <strong>80 e 443</strong> precisam aceitar acesso ao site, no servidor e no painel da hospedagem.</p><p>Antes de ativar qualquer firewall, libere também a <strong>porta SSH que você está usando</strong>. Ela pode ser diferente de 22. Se usar a porta errada, você perde o acesso ao servidor; nesse caso, entre pelo console ou VNC da hospedagem para corrigir.</p></div></details>
              </Etapa>

              <Etapa numero={3} introducao="O Supabase guarda seus contatos, conversas e negócios. Agora, um token de acesso pessoal permite que o instalador prepare o banco por você." resultado="o token está disponível no terminal da VPS. O projeto será criado automaticamente ao executar o passo 5.">
                <Aviso titulo="Uma cópia, e o instalador cuida do resto">Você não precisa criar um projeto nem copiar URL, anon key, service_role e conexão do banco uma por uma. Com o token, o instalador cria o projeto em São Paulo, busca as credenciais, testa a conexão e configura os links dos e-mails de acesso.</Aviso>
                <ol className="list-decimal space-y-4 pl-5 leading-relaxed marker:font-bold marker:text-accent-700">
                  <li>Entre na sua <Link href={LINKS.supabase}>conta do Supabase</Link>. Se ainda não tem uma, crie a conta primeiro.</li>
                  <li>Abra <Link href={LINKS.tokens}>Access Tokens — tokens de acesso</Link> e clique em <strong>Generate new token</strong>.</li>
                  <li>Dê um nome que reconheça, como <Codigo>Instalação do CRM</Codigo>, gere o token e copie o valor. Ele começa com <Codigo>sbp_</Codigo>.</li>
                  <li>Volte ao terminal <strong>dentro da VPS</strong> e execute o comando abaixo. Depois, cole o token quando ele pedir e pressione Enter.</li>
                </ol>
                <Copiar comando={CMD.token} />
                <p className="text-sm leading-relaxed text-text-muted">O campo fica oculto enquanto você cola. Mantenha esta conexão SSH aberta até rodar o instalador: o token fica disponível nessa sessão, sem colocá-lo no histórico de comandos.</p>
                <Aviso titulo="O token pertence à sua conta">Ele dá acesso aos projetos do Supabase. Cole somente no terminal da sua VPS, nunca nesta página, em prints ou em chats. O instalador não grava o token no arquivo de configuração. Ao terminar, você pode revogá-lo em Access Tokens. Para instalar para um cliente, use a conta do cliente.</Aviso>
                <details className="rounded-lg border border-border bg-surface p-5"><summary className="cursor-pointer font-bold">Já tenho um projeto Supabase com dados</summary><div className="mt-3 space-y-3 text-sm leading-relaxed text-text-muted"><p>Este caminho com token cria um <strong>novo projeto</strong> quando as credenciais estão vazias. Para aproveitar um banco existente, siga o <Link href={`${GITHUB}/blob/main/.agents/skills/deskcomm-instalar/references/supabase.md`}>guia de projeto existente</Link>: nesse cenário, você informa as credenciais do projeto.</p><p>Use a conexão <strong>Session pooler</strong>, em modo URI, e confira Site URL e Redirect URLs no Supabase. Não rode uma instalação nova esperando recuperar os dados de outro projeto.</p></div></details>
              </Etapa>

              <Etapa numero={4} introducao="Seu domínio é o endereço que você vai abrir no navegador. Vamos fazer esse endereço chegar à VPS." resultado="o endereço escolhido aponta para o IP do servidor. O instalador confere isso antes de publicar o site.">
                <div className="space-y-3"><p className="leading-relaxed">Ainda não tem um domínio? Você pode registrá-lo na HostGator e depois seguir a configuração abaixo.</p><a href={LINKS.dominio} rel="sponsored" className="inline-flex min-h-11 items-center rounded bg-accent-600 px-4 py-3 text-sm font-bold text-white hover:bg-accent-700">Registrar domínio na HostGator ↗</a><p className="text-xs leading-relaxed text-text-muted">Link de parceria: registrar por ele apoia o projeto.</p></div>
                <p className="leading-relaxed">No painel onde seu domínio foi registrado, abra a área de <strong>DNS</strong> e crie um registro com estes valores:</p>
                <dl className="divide-y divide-border rounded-lg border border-border bg-surface px-5">
                  {[["Tipo", "A"], ["Nome / Host", "crm (ou @ para usar o domínio principal)"], ["Aponta para / Valor", "O IP da sua VPS"]].map(([k, v]) => <div key={k} className="grid gap-1 py-4 sm:grid-cols-[150px_minmax(0,1fr)]"><dt className="text-sm text-text-muted">{k}</dt><dd className="font-bold">{v}</dd></div>)}
                </dl>
                <p className="leading-relaxed">Por exemplo: <Codigo>crm.suaempresa.com.br</Codigo>. Anote o endereço completo; é ele que você vai informar ao instalador. Use só o endereço, sem <Codigo>https://</Codigo> e sem barra no final.</p>
                <Aviso titulo="O endereço pode levar um tempo para funcionar">Se puder, prepare o DNS com antecedência. O instalador confere se ele já aponta para a VPS. Se usa Cloudflare, deixe a nuvem cinza, em “Somente DNS”, até concluir a instalação e aparecer o cadeado.</Aviso>
              </Etapa>

              <Etapa numero={5} introducao="Com o token na mesma sessão SSH e o domínio preparado, é hora de colocar o CRM no ar." resultado="o instalador mostra a conclusão e o endereço de acesso ao CRM.">
                <h3 className="text-xl font-bold">No terminal da VPS, copie e execute</h3>
                <Copiar comando={CMD.instalar} />
                <p className="text-sm leading-relaxed text-text-muted">O primeiro comando baixa o projeto. Depois você entra na pasta e inicia a instalação. Ao final, o último comando retira o token desta sessão. Se o Git não estiver disponível, siga a orientação da sua hospedagem para instalá-lo.</p>
                <h3 className="text-xl font-bold">O que vai acontecer</h3>
                <ol className="list-decimal space-y-3 pl-5 leading-relaxed marker:font-bold marker:text-accent-700">
                  <li><strong>Preparação:</strong> confere o servidor e oferece instalar o Docker se ele faltar.</li>
                  <li><strong>Banco automático:</strong> usa o token do passo 3 para criar o projeto Supabase e obter as credenciais.</li>
                  <li><strong>Suas informações:</strong> pergunta o domínio, os dados de acesso do administrador e qual IA você quer usar.</li>
                  <li><strong>Publicação:</strong> prepara o banco, baixa as imagens prontas do sistema e verifica os serviços. A VPS não precisa compilar o CRM.</li>
                </ol>
                <div className="rounded-lg border border-border bg-surface p-5">
                  <h3 className="font-bold">Deixe estas respostas por perto</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-muted"><li>O domínio completo e seu e-mail para os avisos do certificado.</li><li>O e-mail e a senha que você quer usar para entrar como administrador.</li><li>O nome que quer mostrar na interface.</li><li>A chave de OpenRouter, Anthropic ou OpenAI, se já tiver uma. Você pode pular a chave e cadastrar depois.</li></ul>
                  <p className="mt-4 text-sm leading-relaxed text-text-muted">A versão da imagem já vem sugerida. Com o banco criado pelo token, as quatro credenciais do Supabase são preenchidas automaticamente.</p>
                </div>
                <Aviso titulo="Errou uma resposta? Não precisa recomeçar">Digite <Codigo>voltar</Codigo> para refazer a pergunta anterior. No final, a conferência permite corrigir pelo número do item. Campos secretos não aparecem: cole uma vez e pressione Enter.</Aviso>
                <details className="rounded-lg border border-border bg-surface p-5"><summary className="cursor-pointer font-bold">Prefiro instalar com ajuda de um assistente de IA</summary><div className="mt-4 space-y-4"><p className="text-sm leading-relaxed text-text-muted">Abra seu assistente de programação <strong>dentro da VPS</strong>, pela conexão SSH. Você pode usar Claude Code, Codex ou OpenCode. Instale-o seguindo a documentação oficial e use este pedido:</p><Copiar comando={CMD.assistente} conversa /><p className="text-sm leading-relaxed text-text-muted">O assistente também pode pedir dados de domínio e administrador. O token do Supabase deve ser colado no campo oculto do terminal.</p><Link href="/guias#assistentes">Ver os guias dos assistentes →</Link></div></details>
              </Etapa>

              <Etapa numero={6} introducao="A parte do servidor terminou. Agora você continua pelo navegador, no endereço que escolheu." resultado="você entrou no CRM com a conta do administrador e começou a configurar sua empresa.">
                <ol className="list-decimal space-y-4 pl-5 leading-relaxed marker:font-bold marker:text-accent-700"><li>Abra <Codigo>https://crm.suaempresa.com.br</Codigo>, trocando pelo seu endereço.</li><li>Entre com o e-mail e a senha do administrador que definiu na instalação.</li><li>Siga o onboarding para informar o nome da empresa, o que ela faz e o fuso horário.</li></ol>
                <p className="text-sm leading-relaxed text-text-muted">O certificado de segurança pode levar alguns minutos no primeiro acesso. Se aparecer um aviso, aguarde e recarregue. Se continuar, consulte a ajuda ao final desta página.</p>
                <Aviso titulo="Verificação em duas etapas: você escolhe quando ativar">Ela é opcional e pode ser ligada em <strong>Configurações → Segurança</strong>. Se ativar, guarde os códigos de recuperação em um lugar seguro.</Aviso>
              </Etapa>

              <Etapa numero={7} introducao="Tenha o celular por perto. O número de atendimento vai se conectar ao CRM por QR code." resultado="a conexão aparece ativa no CRM e você consegue acompanhar uma mensagem de teste na Inbox.">
                <ol className="list-decimal space-y-4 pl-5 leading-relaxed marker:font-bold marker:text-accent-700"><li>No celular, abra o <strong>WhatsApp → Aparelhos conectados → Conectar um aparelho</strong>.</li><li>No passo de conexão do onboarding, gere o QR code.</li><li>Leia o QR com a câmera do WhatsApp. Se expirar, clique em <strong>Gerar novo QR Code</strong> e tente de novo.</li><li>Envie uma mensagem de outro número para conferir a chegada na Inbox do CRM.</li></ol>
                <Aviso titulo="Deixe a tela do celular pronta antes de gerar o QR">O código vale por poucos minutos. Prefira um número dedicado ao atendimento da empresa.</Aviso>
              </Etapa>

              <Etapa numero={8} introducao="A instalação coloca o sistema no ar. A configuração do agente ensina como ele deve atender o seu negócio." resultado="sua credencial está cadastrada, o agente tem instruções do seu negócio e você conferiu uma conversa de teste.">
                <p className="leading-relaxed">Se pulou a chave na instalação, cadastre em <strong>IA → Credenciais</strong>. Se já informou, ela estará configurada. Você pode escolher entre <Link href={LINKS.openrouter}>OpenRouter</Link>, <Link href={LINKS.anthropic}>Anthropic</Link> e <Link href={LINKS.openai}>OpenAI</Link>.</p>
                <p className="leading-relaxed">Em <strong>Agente de IA → Agentes</strong>, configure o nome, as instruções, o tom de voz, as ações permitidas e a base de conhecimento da sua empresa. Faça uma conversa de teste para conferir as respostas antes de atender seus clientes.</p>
                <Aviso titulo="Áudio e base de conhecimento usam uma chave à parte">Se escolheu OpenRouter ou Anthropic, a chave da OpenAI é opcional na instalação e serve para transcrição de áudios e indexação da base de conhecimento. Você pode adicioná-la depois em <strong>IA → Credenciais</strong>.</Aviso>
                <p className="leading-relaxed">Quer trocar a IA depois? A configuração de provedores fica na tela, sem reinstalar o sistema. O <Link href={CURSO}>curso em imagens</Link> mostra onde clicar e como preparar o atendimento.</p>
              </Etapa>

              <section id="aprender-a-usar" aria-labelledby="titulo-curso-visual" className="mb-12 scroll-mt-24 rounded-xl bg-accent-900 p-6 text-white sm:p-8">
                <p className="text-sm font-bold text-accent-200">Instalação concluída</p>
                <h2 id="titulo-curso-visual" className="mt-3 text-balance text-2xl font-bold sm:text-3xl">Seu próximo passo é aprender a usar.</h2>
                <p className="mt-4 max-w-[54ch] text-pretty leading-relaxed text-accent-100">Continue no curso visual gratuito. Com telas reais e indicações de onde clicar, você aprende a atender pela Inbox, organizar o funil e configurar os agentes de IA.</p>
                <a href={CURSO} className="mt-6 inline-flex min-h-12 items-center rounded bg-bg px-5 py-3 text-sm font-bold text-accent-900 hover:bg-accent-100 focus-visible:outline-white">Começar o curso visual →</a>
                <p className="mt-4 text-sm leading-relaxed text-accent-200">Abra o CRM ao lado do curso e acompanhe no seu ritmo. A primeira lição apresenta a Inbox.</p>
              </section>

              <section id="manutencao" className="scroll-mt-24 border-t border-border py-12">
                <h2 className="text-balance text-2xl font-bold tracking-[-0.02em]">Instalou? Cuide do que é seu.</h2>
                <p className="mt-4 leading-relaxed text-text-muted">Para atualizar, procure <strong>“Nova versão”</strong> no rodapé do menu do CRM e clique em <strong>“Atualizar agora”</strong>. A tela mostra a mudança e acompanha a atualização, com backup antes.</p>
                <div className="mt-6"><Aviso titulo="Backup precisa de uma rotina"><p>O plano grátis do Supabase não inclui backup automático. Rode o script do kit regularmente e guarde uma cópia fora da VPS. Os arquivos gerados pelo script ficam no próprio servidor.</p></Aviso></div>
                <div className="mt-6 space-y-5">
                  {[["Conferir a saúde do sistema", CMD.saude], ["Fazer backup", CMD.backup], ["Atualizar pelo terminal", CMD.atualizar], ["Redefinir a senha", CMD.senha], ["Recuperar acesso sem o autenticador", CMD.mfa]].map(([titulo, comando]) => <div key={comando}><h3 className="mb-2 text-sm font-bold">{titulo}</h3><Copiar comando={comando} /></div>)}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">Execute dentro da pasta <Codigo>deskcommcrm</Codigo>, na VPS. Nos comandos de recuperação, troque <Codigo>seu@email.com</Codigo> pelo e-mail da conta.</p>
                <details className="mt-6 rounded-lg border border-border bg-surface p-5"><summary className="cursor-pointer font-bold">Preciso restaurar um backup</summary><p className="mt-3 text-sm leading-relaxed text-text-muted">A restauração exige um banco vazio. Não rode uma instalação nova antes de restaurar, nem tente aplicar o backup por cima do banco em uso. Siga o <Link href={`${GITHUB}/blob/main/.agents/skills/deskcomm-instalar/references/supabase.md#trocar-de-projeto-ou-restaurar`}>guia de restauração</Link> para preparar o destino correto.</p></details>
              </section>

              <section id="ajuda" className="scroll-mt-24 border-t border-border py-12">
                <h2 className="text-balance text-2xl font-bold tracking-[-0.02em]">Travou? Comece por aqui.</h2>
                <p className="mt-3 text-text-muted">As dúvidas mais comuns de quem instala pela primeira vez.</p>
                <div className="mt-6 divide-y divide-border border-y border-border">
                  {PROBLEMAS.map(({ p, r }) => <details key={p} className="group"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 font-bold [&::-webkit-details-marker]:hidden">{p}<span aria-hidden className="text-xl font-normal text-accent-700 group-open:rotate-45">+</span></summary><p className="pb-5 leading-relaxed text-text-muted">{r}</p></details>)}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-text-muted">Ainda precisa de ajuda? Consulte os <Link href="/guias">guias dos assistentes</Link> ou o <Link href={`${GITHUB}/blob/main/.agents/skills/deskcomm-instalar/references/problemas-e-armadilhas.md`}>catálogo de problemas do instalador</Link>. Não compartilhe senhas, tokens ou dados de clientes ao pedir ajuda.</p>
              </section>

              <p className="text-xs leading-relaxed text-text-muted">Adaptado do <Link href={NOTION_ORIGINAL}>guia original no Notion</Link> e revisado com o <Link href={`${GITHUB}/tree/main/hostgator-setup-kit`}>kit de instalação</Link>. Fluxo deste guia: Supabase na nuvem com token pessoal. Para banco no próprio servidor, veja o <Link href={`${GITHUB}/blob/main/.agents/skills/deskcomm-instalar/references/supabase-local.md`}>guia específico</Link>.</p>
            </div>
          </div>
        </div>
      </main>
      <Rodape c={c} idioma="pt-BR" pagina="instalacao" atualizadoEm={INSTALACAO_ATUALIZADA_EM} />
    </>
  );
}
