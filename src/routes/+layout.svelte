<script>
    const modo_teste = import.meta.env.VITE_MODO_TESTE
</script>

<svelte:head>
    {#if modo_teste === undefined}
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9DPHEL7LVF"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9DPHEL7LVF');
        </script>
    {:else}
        <meta name="modo_teste"/>
    {/if}
</svelte:head>


<div style="overflow-x:hidden; overflow-y:clip">
    <slot/>
</div>