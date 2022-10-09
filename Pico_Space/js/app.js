"use strict";

import { PerspectiveCamera, Scene, WebGLRenderer } from "../js/build/three.module.js";
import { VRButton } from './VRButton.js';

import solarSystem from "./solarSystem.js";


export default class App {

    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        
        this.fov = 75;
        this.near = 0.1;
        this.far = 1000;

        this.camera = new PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.camera.position.z = 50;

        this.scene = new Scene();

        let canvas = document.createElement("canvas");
        let context = canvas.getContext("webgl2");

        this.renderer = new WebGLRenderer({
            canvas: canvas,
            context: context
        });

        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.width, this.height);

        document.body.appendChild( VRButton.createButton( this.renderer ) );
        this.renderer.xr.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        this.solarSystem = new solarSystem(this.scene);
        //this.render();
        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    render(){
        this.solarSystem.animate();
        this.renderer.render( this.scene, this.camera );

    }
}

new App();