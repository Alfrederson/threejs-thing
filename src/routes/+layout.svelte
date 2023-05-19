<script>
    import { onMount } from "svelte";

    const modo_teste = import.meta.env.VITE_MODO_TESTE
    const id_gtag    = import.meta.env.VITE_GOOGLE_TAG_ID

    if(!modo_teste){
        onMount(()=>{
            window.dataLayer = window.dataLayer || [];
            function gtag(){
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', id_gtag);
            console.log("gtag inicializado.")
        })
    }else{
        console.log("MODO TESTE. Usando gtag ", id_gtag)
    }
</script>

<svelte:head>
    {#if modo_teste === undefined}
        <script async src="https://www.googletagmanager.com/gtag/js?id={id_gtag}"></script>
    {/if}
</svelte:head>


<div style="overflow-x:hidden; overflow-y:clip">
    <slot/>
</div>