# Site Dra. Déborah Araújo

Site institucional da Dra. Déborah Araújo, médica (emagrecimento, lipedema e performance). Desenvolvido por HS Performance.

## Estrutura dos arquivos

```
index.html                  Estrutura e todos os textos do site
assets/
  css/style.css             Cores, fontes, espaçamentos, animações e layout responsivo
  js/main.js                CONFIG (WhatsApp, e-mail, Instagram) e todas as interações
  img/
    logo.svg / logo-claro.svg            Logo completa (vetor extraído da identidade visual)
    nome.svg / nome-claro.svg            Só o nome, usado no topo
    monograma.svg / monograma-claro.svg  Monograma "DA"
    padrao.svg                           Padrão de monogramas (fundos)
    dra-deborah-retrato.webp             Foto do topo
    dra-deborah-sobre.webp               Foto da seção Sobre
    favicon.png, apple-touch-icon.png    Ícones
    compartilhamento.jpg                 Imagem ao compartilhar o link (1200x630)
```

## Contatos e formulário

| O quê | Onde |
|---|---|
| WhatsApp (5531983125089) | `assets/js/main.js`, `CONFIG.whatsapp`, e `index.html`, seção Contato |
| CRM-MG 107998 | `index.html`: seção Sobre e rodapé |
| E-mail que recebe as respostas do formulário | `assets/js/main.js`, `CONFIG.respostas` |
| Domínio | criar o arquivo `CNAME` e trocar `og:image` por endereço completo |

O formulário faz duas coisas ao ser enviado:
1. Manda uma cópia das respostas (nome, telefone, interesse e mensagem) para o e-mail de `CONFIG.respostas`, pelo serviço gratuito FormSubmit. **No primeiro envio com o site no ar, chega um e-mail de ativação nesse endereço: clique em "Activate Form" uma vez.** Depois disso, cada envio chega como e-mail.
2. Abre o WhatsApp com todas as respostas já escritas na mensagem, para a paciente só tocar em enviar.

## Interações

Abertura com o monograma sendo desenhado, cursor personalizado, botões magnéticos, foto em arco com parallax, selo girando, faixa animada, foto com inclinação 3D, frase que acende com a rolagem, painéis expansíveis das áreas, linha do tempo que preenche com a rolagem, checklist interativo de lipedema, padrão revelado pelo mouse na seção do Instagram. Tudo respeita a configuração "reduzir movimento" do aparelho.

## Cores da marca

| Nome | Código |
|---|---|
| Marrom | `#765743` |
| Taupe | `#B5A18C` |
| Linho | `#EEEADF` |
| Marfim | `#F0EEEB` |

Fontes: a identidade usa Faberge e Lemon Milk, que não estão no Google Fonts. O site usa Cormorant Garamond (títulos), Josefin Sans (rótulos, próxima da letra da logo) e Jost (textos). Se a agência enviar os arquivos das fontes originais, dá para trocar.
