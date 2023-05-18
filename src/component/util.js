import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"


const loader = new GLTFLoader()
export function loadGLTF(filename){
    return loader.loadAsync(filename)
}

const pastelTonesHex = [
    '#FF0000',
    '#00FFFF',
    '#00FF00',
    '#FF00FF',
    '#FFFF00'
];

export function qualquerCor(){
    return pastelTonesHex[ (Math.random() * pastelTonesHex.length)|0];
}