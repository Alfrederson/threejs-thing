<script>
    import { onMount } from "svelte";
    import * as THREE from "three";
    
    import { qualquerCor, loadGLTF } from "./util";

    export let addToList = () => {};
    export let aos = ""
    export let model = ""

    let div;
    let grabbing = false;
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
            color: 0,
        });
        const matWire = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: qualquerCor(),
        });


        // bora ver se dá certo isso...

        if(model !== ""){
            loadGLTF(model).then( gltf =>{
                const mesh = gltf.scene
                mesh.traverse( child =>{
                    if(child.isMesh){
                        child.material = matFlat
                        const wire = new THREE.WireframeGeometry(child.geometry)
                        const line = new THREE.LineSegments( wire )
                        line.material.depthTest = true
                        line.material.color.set(qualquerCor())
                        line.scale.set(1.01,1.01,1.01)
                        scene.add(line)
                    }
                })
                scene.add(mesh)
            })
        }else{
            const mCube = new THREE.Mesh(gCube, [matFlat, matWire]);
            const wCube = new THREE.Mesh(gCube, matWire);
            // isso é um jeito tosco de fazer aquele efeito
            // de wireframe opaco
            wCube.scale.set(1.01,1.01,1.01)
            scene.add(mCube);
            scene.add(wCube);
        }

        const pivot = new THREE.Group()
        pivot.add(camera)
        camera.position.z = 2.5;
        scene.add(pivot)
        const animate = () => {
            pivot.rotateY(0.05+sx);
            pivot.rotateX(0.01+sy);

            sx = sx * 0.9;
            sy = sy * 0.9;
        };
        addToList({
            div,
            scene,
            animate,
            camera,
        });
    });

    function grabStart(ev) {
        oldX = ev.clientX
        oldY = ev.clientY
    }

    function grabMove(ev) {
        sx = (oldX - ev.clientX) * 0.001
        sy = (oldY - ev.clientY) * 0.001
    }
</script>

<div class="divExterior"
    data-aos={aos}
    on:mouseenter={grabStart}
    on:mousemove ={grabMove}>
    <div bind:this={div} class="div3d"/>
</div>

<style>
    .div3d {
        width: 256px;
        height: 256px;
        margin-left: auto;
        margin-right: auto;
        background-image: linear-gradient(
                #009999 0.5px,
                transparent 0.5px,
                transparent calc(100% - 0.5px),
                #009999 calc(100% - 0.5px)
            ),
            linear-gradient(
                90deg,
                #009999 0.5px,
                transparent 0.5px,
                transparent calc(100% - 0.5px),
                #009999 calc(100% - 0.5px)
            );
        background-size: 2em 2em;
        border: 0.5px solid #00ffff;       
        box-shadow:-16px -16px 0px red;
        background-color: black;       
        cursor: crosshair;  
    }
    .divExterior {
        text-align: center;
        user-select: none;  
    }
</style>
