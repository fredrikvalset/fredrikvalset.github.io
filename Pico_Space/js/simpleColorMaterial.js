"use strict";

import {ShaderMaterial} from "./build/three.module.js";


export default class SimpleColorMaterial extends ShaderMaterial {
    constructor({
                    //Kan kalle parameterne hva vi vil - her kalt 'xInParameters' for å tydeliggjøre skillet mellom parameter og uniform-variabel i shaderne
                    //Bruker senere som verdier til uniform-variabler vi sender til shadere
                    mapInParameters = null, //Tekstur
                    colorInParameters = null //Farge som skal fargelegge videre
                }) {

        const vertexShader = `
            out vec2 vUv;
            
            void main(){
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        
        `

        const fragmentShader = `
            uniform sampler2D textureInShader;
            uniform vec3 colorInShader;
           
            in vec2 vUv;
            
            void main(){
                
               vec3 farge = vec3(1.0, 1.0, 1.0); //legger inn ny farge, erstatter colorInShader
               vec4 textureColor = texture(textureInShader, vUv);
                gl_FragColor = vec4(textureColor.xyz * farge, 1.0);             
            }
     
        `

        super({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {

                textureInShader: {
                    value: mapInParameters
                },
                colorInShader: {
                    value: colorInParameters
                }
            }
        });
    }
}