<script>
    import { onMount } from "svelte";
    import { qualquerCor } from "./util";
    import * as THREE from "three";

    export let addToList = () => {};
    export let aos
    let div;
    let grabbing = false;
    let evDetails = ""
    let sx = 0.1,
        sy = 0,
        oldX = 0,
        oldY = 0;
    function qualquerForma() {
        return new [
            THREE.IcosahedronGeometry,
            THREE.BoxGeometry,
            THREE.ConeGeometry,
            THREE.CylinderGeometry,
            THREE.DodecahedronGeometry,
        ][ Math.floor(Math.random() * 5)]();
    }

    onMount(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
        const gCube = qualquerForma();
        const matFlat = new THREE.MeshBasicMaterial({
            color: 0x000000,
        });
        const matWire = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x00ff00,
            depthTest: true,
            side: THREE.BackSide,
        });

        const mCube = new THREE.Mesh(gCube, matFlat);
        const wCube = new THREE.Mesh(gCube, matWire);

        wCube.scale.set(1.01,1.01,1.01)
        scene.add(mCube);
        scene.add(wCube);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);

        const pivot = new THREE.Group()

        pivot.add(camera)
        camera.position.z = 3;


        directionalLight.position.set(1, 1, 1);

        scene.add(directionalLight);
        
        scene.add(pivot)
        const animate = () => {
            pivot.rotateY(0.05+sx);
            pivot.rotateX(0.01+sy);

            sx = sx * 0.9;
            sy = sy * 0.9;
        };

        console.log("Criando a cena aqui");

        addToList({
            div,
            scene,
            animate,
            camera,
        });
    });

    function grabStart(ev) {
        grabbing = true;

        oldX = ev.clientX
        oldY = ev.clientY
    }
    function grabEnd() {
        grabbing = false;
    }
    function grabMove(ev) {
        if (!grabbing)
            return;
        sx = (oldX - ev.clientX) * 0.001
        sy = (oldY - ev.clientY) * 0.001
    }
</script>

<div class="divExterior"
    data-aos={aos}
    on:mouseenter={grabStart}
    on:mouseleave={grabEnd}
    on:mousemove={grabMove}>
    <div
        bind:this={div}
        class="div3d"/>
</div>

<style>
    .div3d {
        width: 256px;
        height: 256px;
        margin-left: auto;
        margin-right: auto;
        background-image: linear-gradient(
                #009900 0.5px,
                transparent 0.5px,
                transparent calc(100% - 0.5px),
                #009900 calc(100% - 0.5px)
            ),
            linear-gradient(
                90deg,
                #009900 0.5px,
                transparent 0.5px,
                transparent calc(100% - 0.5px),
                #009900 calc(100% - 0.5px)
            );
        background-size: 2em 2em;
        border: 0.5px solid #00ff00;       
        filter: drop-shadow(-8px 8px 0px #000);
        background-color: black;       
        cursor: crosshair;  
    }
    .divExterior {
        text-align: center;
        user-select: none;
        
    }
</style>
