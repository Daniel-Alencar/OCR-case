This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Descrição

Este projeto tem como objetivo desenvolver uma solução web que permita aos usuários fazer upload de imagens, extrair o texto dessas imagens usando OCR (Reconhecimento Óptico de Caracteres) e solicitar explicações interativas sobre o conteúdo extraído, utilizando um modelo de linguagem (LLM - Large Language Model).

## Execução do projeto

Clone o repositório:

```
git clone https://github.com/Daniel-Alencar/OCR-case
```
Entre na pasta do projeto:

```
cd OCR-case
```

É necessário preencher a variável de ambiente .env da aplicação com a API KEY da conta da Open AI. Isso é necessário para acessar os modelos LLM que a Open AI disponibiliza para seus usuários.

Além disso, é necessário especificar a variável de ambiente para usar o Vercel Blob Storage. Além do uso de outras variáveis. 

Com o intuito de testar a aplicação, posso disponibilizar o arquivo .env usado no projeto. Entre em contato comigo pelo email danielalencar746@gmail.com ou pelo whatsapp 87991016291.

Instale as dependências

```
npm install
```

Execute o projeto localmente:

```
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) com o seu navegador para ver o resultado.

## Deploy

O deploy do projeto foi feito pelo Vercel e está disponível no link [https://ocr-case.vercel.app/](https://ocr-case.vercel.app/)

## Observações

Às vezes é necessário recarregar a página para que as atualizações sejam exibidas na página.