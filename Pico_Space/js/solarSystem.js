"use strict";

import {
    AmbientLight, Color,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial, MeshPhysicalMaterial,
    Object3D, PointLight, Sphere,
    SphereGeometry, Texture,
    TextureLoader
} from "./build/three.module.js";
import SimpleColorMaterial from "./SimpleColorMaterial.js";

export default class solarSystem {

constructor(scene) {
    let radius = 5;
    let widthSegments = 64;
    let heightSegment = 64;

    let sunGeometry = new SphereGeometry(radius, widthSegments, heightSegment);

    let sunTextureUrl = "assets/texture_sun.jpg";
    let sunTexture = new TextureLoader().load(sunTextureUrl);

    /*let sunMaterial = new MeshBasicMaterial({
        map: sunTexture
    });*/

    let sunMaterial = new SimpleColorMaterial({
        mapInParameters: sunTexture,
        colorInParameters: new Color(0xFF0000)
    })

    this.sun = new Mesh(sunGeometry, sunMaterial);
    this.sun.position.z = -50;
    scene.add(this.sun);

    this.earthOrbitNode = new Object3D();
    this.sun.add(this.earthOrbitNode);

    this.earthOrbitNode = new Object3D();
    this.sun.add(this.earthOrbitNode);

    let earthTextureUrl = "assets/texture_earth.jpg";
    let earthTexture = new TextureLoader().load(earthTextureUrl);


    let earthSpecularMap = new TextureLoader().load("assets/earthspec1k.jpg");
    let earthNormalMap = new TextureLoader().load("assets/2k_earth_normal_map.png");


    let earthMaterial = new MeshPhongMaterial({map:earthTexture,
        shininess:1.0,
        specular: earthSpecularMap,
        normalMap: earthNormalMap
    });
     


    radius = 2.5;
    let earthGeometry = new SphereGeometry(radius, widthSegments, heightSegment);

    this.earth = new Mesh(earthGeometry, earthMaterial);

    this.earth.position.x = 15;
    this.earthOrbitNode.add(this.earth);



    // Mars

    // Usynlig Object3D som mars skal rotere rundt
    this.marsOrbitNode = new Object3D();

    // Legger det til som et barn av solen
    this.sun.add(this.marsOrbitNode);

    let marsTextureUrl = "assets/mars_1k_color.jpg";
    let marsTexture = new TextureLoader().load(marsTextureUrl);

    let marsSpecularMap = new TextureLoader().load("assets/earthspec1k.jpg");
    let marsNormalMap = new TextureLoader().load("assets/2k_earth_normal_map.png");

    let marsMaterial = new MeshPhongMaterial({
        map: marsTexture,
        shininess: 1.0,
        specular: marsSpecularMap,
        normalMap: marsNormalMap
    })

    radius = 3.2;

    let marsGeometry = new SphereGeometry(radius, widthSegments, heightSegment);
    this.mars = new Mesh(marsGeometry, marsMaterial);
    this.mars.position.x = -20;
    this.mars.position.z = 15;

    // Gjør Mars til et barn av marsOrbitNode, arver rotasjonen som gjøres på marsOrbitNode
    this.marsOrbitNode.add(this.mars);


    // Mercury

    this.mercuryOrbitNode = new Object3D();

    // Legger det til som et barn av solen
    this.sun.add(this.mercuryOrbitNode);

    let mercuryTextureUrl = "assets/mercurymap.jpg";
    let mercuryTexture = new TextureLoader().load(mercuryTextureUrl);

    let mercurySpecularMap = new TextureLoader().load("assets/earthspec1k.jpg");
    let mercuryNormalMap = new TextureLoader().load("assets/2k_earth_normal_map.png");

    let mercuryMaterial = new MeshPhongMaterial({
        map: mercuryTexture,
        shininess: 1.0,
        specular: mercurySpecularMap,
        normalMap: mercuryNormalMap
    })

    radius = 1;

    let mercuryGeometry = new SphereGeometry(radius, widthSegments, heightSegment);
    this.mercury = new Mesh(mercuryGeometry, mercuryMaterial);
    this.mercury.position.x = -10;
    this.mercury.position.z = 5;

    // Gjør Mercury til et barn av mercuryOrbitNode, arver rotasjonen som gjøres på mercuryOrbitNode
    this.marsOrbitNode.add(this.mercury);


    // PointLight, lyser i alle retninger
    this.sunLight = new PointLight(0xffffff, 3);

    this.sun.add(this.sunLight);

    // Bakgrunnsbelysning
    this.ambiantLight = new AmbientLight(0xffffff, 0.05);
    scene.add(this.ambiantLight);

    

}


animate() {
    this.sun.rotation.y += 0.005;

    this.earthOrbitNode.rotation.y += 0.01;
    this.earth.rotation.y += 0.02;

    this.marsOrbitNode.rotation.y += 0.005;
    this.mars.rotation.y += 0.01;

    this.mercuryOrbitNode.rotation.y += 0.05;
    this.mercury.rotation.y += 0.01;


}

}