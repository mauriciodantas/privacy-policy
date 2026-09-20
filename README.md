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

### Domínio

O site é servido em <https://privacy.mdantas.net/> — na raiz do domínio, sem o
sufixo `/privacy-policy`, que só existe na URL padrão do Pages
(`mauriciodantas.github.io/privacy-policy/`).

A configuração tem dois lados, e em nenhum deles entra um caminho de URL:

| Onde | O que é configurado | Valor |
| --- | --- | --- |
| DNS do domínio | registro `CNAME` de `privacy` apontando para o GitHub | `mauriciodantas.github.io` |
| **Settings → Pages → Custom domain** | o domínio a ser servido | `privacy.mdantas.net` |

O arquivo `CNAME` na raiz do repositório repete o domínio para que ele
sobreviva a redeploys. Com o domínio validado, marque **Enforce HTTPS**.

## Atualizando o conteúdo

O texto vive em `index.html`, em pares `data-pt` / `data-en` — ao editar um
idioma, edite o outro junto. O texto visível dentro da tag serve de fallback
caso o JavaScript não execute, então vale mantê-lo igual ao `data-pt`.

Lembre-se de atualizar também a linha "Última atualização" no rodapé.
