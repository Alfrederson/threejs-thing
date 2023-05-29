<script>
    import { qualquerCor } from "./util";

    // isso é sua URL do pipedream
    const URL = import.meta.env.VITE_ENDPOINT_PIPEDREAM

    let busy = false
    let sucesso = false
    const form = {
        name    : "",
        email   : "",
        message : ""
    }

    function enviar(ev){
        ev.preventDefault()
        if(sucesso || busy)
            return;
        busy = true
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch(URL, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(form),
            redirect: 'follow'
        })
        .then(response => response.text())
        .then(result => {
            sucesso = true
            console.log(result)
        })
        .catch(error =>{
            console.log("Deu algum erro aí!")
        })
        .finally( error =>{
            busy = false
        })
    }
</script>

<style>
    fieldset{
        border: none;
    }
    input, textarea{
        color:yellow;
        width: 100%;

        font-size:large;
        border: 2px solid red;
        background-color: black;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        border-radius:0.5em;
        padding-left:1em;
        padding-right:1em;   
        padding-top:1em;
        padding-bottom:1em;     
        
        transition: all 0.2s ease;
    }
    input:focus,
    input[type="submit"]:hover{
        transform: scale3d(1.05,1.05,1.0);
    }
    input[type="submit"]:hover{
        cursor:pointer;
    }
    input[type="submit"]:active{
        transform: scale3d(1.02,1.02,1.0);
        background-color: rgba(100,100,100,0.3);
    }
</style>

<h1>Assine aqui a petição para ajudar a BANIR O USO DO R718</h1>
<form on:submit={enviar}>
    {#if sucesso}
        <h1>SUA ASSINATURA FOI RECEBIDA COM SUCESSO!</h1>
    {:else}
        <fieldset disabled={busy}>
            <p>Nome:</p>
            <input type="text" bind:value={form.name} style="box-shadow: -4px -4px 0px {qualquerCor()};"/>
            <p>E-mail:</p>
            <input type="text" bind:value={form.email} style="box-shadow: -4px -4px 0px {qualquerCor()};"/>
            <p>Deixe aqui sua mensagem:</p>
            <textarea bind:value={form.message} style="box-shadow: -4px -4px 0px {qualquerCor()}; resize: none;"/>
            <p>
            {#if form.name !== ""}
                Eu, {form.name}, ao clicar no botão abaixo, concordo em assinar a PETIÇÃO PARA O BANIMENTO GLOBAL DO USO DO R718.
            {/if}
            </p>
            <input type="submit" style="box-shadow: -4px -4px 0px {qualquerCor()};"/>
        </fieldset>
    {/if}
</form>