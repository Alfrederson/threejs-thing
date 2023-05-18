<script>
    import { browser } from '$app/environment'; 
    import { onMount } from "svelte";
    
    import "aos/dist/aos.css"
    import AOS from 'aos'
    import * as THREE from 'three';

    import Espacador from "../component/Espacador.svelte";
    import Paragrafo from "../component/Paragrafo.svelte";
    import QuemSou from "../component/QuemSou.svelte";
    import TresDe from "../component/TresDe.svelte";

    let canvas,
        ctx,
        renderer

    let tresDeList = []

    function addToList( tresDe ){
        tresDeList.push( tresDe )
        tresDeList = tresDeList
    }

    function initializeRenderer(){
        if(!canvas)
            throw "Cadê o canvas?"

        renderer = new THREE.WebGLRenderer({
            canvas : canvas,
            antialias: false,
            alpha: true
        })

        renderer.setPixelRatio( 1 )
    }

    function render(){
        if(!canvas)
            return;


        // tresDe tem:
        // div: HTMLDivElement
        // scene: THREE.Scene
        // camera: PerspectiveCamera
        // animate: function

        renderer.setScissorTest(false)
        renderer.setClearColor(0x000000,0)
        renderer.clear()
        for(let tresDe of tresDeList){
            let div = tresDe.div
            let rect = div.getBoundingClientRect()
            // pula os que não são exibidos.
            if(rect.y > canvas.height-16 ||
               (rect.y+rect.width) < 16){
                continue
            }

            renderer.setScissorTest( true )
            let bottom = canvas.clientHeight - rect.bottom

            // A gente quer desenhar dentro do retângulo desse div.
            // se a gente tiver o setScissor mas tiver isso, o
            // div vira uma "janelinha", dá um efeito legal.
            renderer.setViewport(
                rect.x,
                bottom,
                rect.width,
                rect.height
            )

            renderer.setScissor(
                rect.x,
                bottom,
                rect.width,
                rect.height
            )

            tresDe.animate()

            renderer.render(
                tresDe.scene,
                tresDe.camera
            )
        }
        // requestAnimationFrame(render)
        setTimeout(render, 65)
    }

    // isso é um timer.
    let doneResizing = false
    onMount(()=>{
        if(!browser){
            console.log("Rodando dentro do SSR")
            return
        }
        AOS.init()

        canvas = document.getElementById("view")

        // largura e altura do canvas
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        
        // inicializa o renderizador
        initializeRenderer()

        let resizeDebouncer
        window.addEventListener("resize", event=>{
            clearTimeout(resizeDebouncer)
            resizeDebouncer = setTimeout( ()=>{
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
            },100)
        })

        requestAnimationFrame( render )
    })

</script>
<style>
    :global(body){
        font-family: monospace;
        margin: 0px;
        font-size: large;

    }

    canvas {
        position: fixed;
        left: 0px;
        top: 0px;
        z-index:1;
        pointer-events:none
    }
</style>


<canvas id="view" />

<h1 style="position: fixed; left:8px;top:8px;">
{tresDeList.length}
</h1>

<Espacador h={100}/>
<Paragrafo>
    <h1>CAMPANHA PARA A PROIBIÇÃO DO USO DO REFRIGENTE INDUSTRIAL R718.</h1>
</Paragrafo>
<Espacador h={200}/>
<TresDe {addToList}/>
<Paragrafo aos="fade-up">
    <h1>O que é R718?</h1>
    
    <p>Você já ouviu falar da substância R718?</p>
    <p>Ela está por toda parte, infiltrando-se silenciosamente em nossas vidas e trazendo efeitos nocivos terríveis.</p>
    <p>R718 é um composto perigoso, comumente utilizado como refrigente em aplicações industriais</p>
</Paragrafo>

<TresDe {addToList} aos="flip-up"/>
<Paragrafo aos="flip-right">
    <h2>Onde o R718 é utilizado?</h2>
    
    <p>O R718 é utilizado em uma série de contextos. Eis alguns exemplos mais conhecidos:</p>
    <ul>
        <li>Em usinas termo-elétricas a carvão, diesel e gás natural.</li>
        <li>Em motores automotivos, misturado com outras substâncias tóxicas como etilenoglicol</li>
    </ul>    
</Paragrafo>
<Espacador h={200}/>
<Paragrafo aos="flip-left">
    <h1>
        Mas não é só isso. O R718 também é utilizado em usinas nucleares.
    </h1>

    <TresDe {addToList} aos="slide-left"/>

    <ul>
        <li>Ele é a única substância tóxica capaz de desacelerar os nêutrons gerados durante a fissão nuclear.</li>
        <li>Ele é utilizado para transferir o calor radioativo produzido para os circuitos de resfriamento.</li>
        <li>Ele é a única coisa capaz de evitar a liberação de produtos de fissão radioativos para o ambiente.</li>
        <li>O Vaso (ou <i>vessel</i>) do reator nuclear é preenchido com uma mistura de água e R718.</li>    
    </ul>
</Paragrafo>
<Espacador h={200}/>
<Paragrafo aos="flip-down">
    <h1>Ele é um poluente presente na chuva ácida e amplamente produzido durante o funcionamento dos motores de foguetes.</h1>
    <h2>
        <b>
            Seus gases componentes são altamente explosivos e capazes de corroer metais, produzindo substâncias altamente tóxicas.
        </b>
    </h2>
    <TresDe {addToList} aos="slide-right"/>
    <h3>
        <i>
            A combustão dos elementos químicos que compõem o R718 produz temperaturas tão elevadas que são capazes de destruir até mesmo diamantes.
        </i>
    </h3>
</Paragrafo>
<Espacador h={200}/>
<Paragrafo aos="zoom-in">
    <h1>Não é só isso: sua ausência também está ligada à desertificação.</h1>
    <TresDe {addToList} aos="slide-down"/>
</Paragrafo>
<Espacador h={200}/>
<Paragrafo aos="zoom-in">
    <p>Quando presente na atmosfera, ele é um gás do efeito estufa mais poderoso do que o gás carbônico.</p>
    <TresDe {addToList} aos="slide-up"/>
</Paragrafo>
<Espacador h={300}/>
<Paragrafo aos="flip-left">
    <QuemSou/>
</Paragrafo>