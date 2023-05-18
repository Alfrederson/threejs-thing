<script>
    import { qualquerCor } from "./util"

    export let aos=""

</script>
<style>
    .container{
        margin-left:2em;
        margin-right:2em;
        margin-top:2em;
        margin-bottom:2em;
    }
    .papel{
        max-width:210mm;
        margin-left: auto;
        margin-right: auto;
        padding: 2em;
        
        color: lime;
        outline:2px solid lime;
    }    
</style>

<div class="container">
    <div class="papel" data-aos={aos} style="background-color:black; color:{qualquerCor()}; filter: drop-shadow(-8px 8px 0px {qualquerCor()});">
        <slot/>
    </div>
</div>