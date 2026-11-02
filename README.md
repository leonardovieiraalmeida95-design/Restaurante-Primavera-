# Restaurante e Pizzaria Primavera

Site em Next.js, React, TypeScript e Tailwind CSS, com exportação estática para o GitHub Pages.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra `http://localhost:3000/Restaurante-Primavera-/`.

## Publicação

Cada atualização na branch `main` executa `.github/workflows/build-pages.yml`, compila o site e publica os arquivos estáticos na raiz usada pelo GitHub Pages. O conteúdo original e as imagens aprovadas ficam em `src/` e `assets/`.
