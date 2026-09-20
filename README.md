# privacy-policy

Página estática com a política de privacidade dos aplicativos e projetos de
Mauricio Dantas. O conteúdo é o mesmo exibido em
[portfolio.mdantas.net](https://portfolio.mdantas.net), publicado aqui de forma
isolada para ser referenciado diretamente pelas lojas de aplicativos.

## Estrutura

```
index.html                     # a página (conteúdo PT/EN em data-attributes)
assets/styles.css              # estilos: cartão, tipografia pixel, overlays CRT
assets/pixel-background.js     # campo de pixels animado (canvas)
assets/i18n.js                 # alternância PT/EN + persistência em localStorage
.github/workflows/deploy.yml   # publicação no GitHub Pages
```

Não há build step nem dependências: abrir `index.html` no navegador já mostra a
versão final.

## Publicação

O workflow `deploy.yml` publica o repositório inteiro no GitHub Pages a cada
push em `main` (e pode ser disparado manualmente em **Actions → Run workflow**).

Para o primeiro deploy é preciso habilitar o Pages uma única vez:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

A URL padrão será `https://mauriciodantas.github.io/privacy-policy/`.

### Domínio próprio (opcional)

Para servir em um subdomínio como `privacy.mdantas.net`:

1. crie um registro DNS `CNAME` apontando `privacy` → `mauriciodantas.github.io`;
2. adicione um arquivo `CNAME` na raiz deste repositório contendo apenas
   `privacy.mdantas.net`;
3. confirme o domínio em **Settings → Pages → Custom domain** e marque
   **Enforce HTTPS**.

## Atualizando o conteúdo

O texto vive em `index.html`, em pares `data-pt` / `data-en` — ao editar um
idioma, edite o outro junto. O texto visível dentro da tag serve de fallback
caso o JavaScript não execute, então vale mantê-lo igual ao `data-pt`.

Lembre-se de atualizar também a linha "Última atualização" no rodapé.
