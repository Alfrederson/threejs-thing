# Template de Landing Pager

Essa é a coisa mais horrível que existe.

Para testar localmente, você precisa definir essa variável em um .env:

To test locally, you need to set this variable in a .env file:



```
VITE_MODO_TESTE=true
```

Pra deployar em qualquer lugar, você precisa definir essas variáveis:

To deploy anywhere, you need to set these variables:



```
VITE_ENDPOINT_PIPEDREAM=(url do endpoint que vai receber a requisição)
VITE_GOOGLE_TAG_ID=(url da sua gtag)
```


# To test

```
npm run dev -- --host
```

# To build

```
npm run build
```

# WHY DOES THIS NOT WORK WITH ADAPTER-VERCEL?

# I DON'T KNOW

If you set the adapter to adapter-vercel in the svelte-config.js, then the whole thing will just 500, even if it works locally. I suspect this has something to do with the static .glb files. No idea how to solve.