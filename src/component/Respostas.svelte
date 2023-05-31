<script>
    import { onMount } from "svelte";
    import Paragrafo from "./Paragrafo.svelte";

    let respostas = []
    
    onMount(async () => {
        let response = await fetch(import.meta.env.VITE_RESPOSTAS)
        if(response.status !== 200)
            return;
        let json = await response.json()
        respostas = json
    })
</script>

<Paragrafo aos="flip-right">
<h1>Veja o que pessoas reais estão dizendo sobre este apocalipse químico:</h1>
{#each respostas as resposta}
<h3><i>{resposta.name}</i> disse:</h3>
<blockquote>{resposta.message}</blockquote>
{/each}

</Paragrafo>
