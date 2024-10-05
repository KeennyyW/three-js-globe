import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "./files/globe-data-min.json";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import {Color, DirectionalLight, PointLight} from "three";

import travelHistory from "./files/connections.json";
import airportHistory from "./files/DataCenters.json";



const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer, camera, scene: THREE.Scene, controls;


    let Globe: any;

    // Initialize renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Initialize scene, light
    scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.5)
    scene.add(ambientLight);
    scene.background = new THREE.Color(0x040d21);

    // Initialize camera, light
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 200;
    camera.position.x = 0;
    camera.position.y = 0;

    const dLight = new DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    const dLight1 = new DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);

    const dLight2 = new PointLight(0x8566cc, 0.5);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    scene.add(camera);


    // Additional effects
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    // Initialize controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    controls.enablePan = false;
    controls.minDistance = 150;
    controls.maxDistance = 220;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = false;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    const renderScene = new RenderPass(scene, camera )
    const composer = new EffectComposer(renderer)
    composer.addPass(renderScene)

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight ),
        1.5,
        0.001,
        0.1

    )
    composer.addPass(bloomPass)



    // Initialize Globe
    Globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.25)

    setTimeout(()=> {
      Globe.arcsData(travelHistory.connection)
          .arcColor((e: { status: never; }) => {
            return e.status ? "#7cd0ff" : "7cd0ff";
          })
          .arcAltitude((e: { arcAlt: never; }) => {
            return e.arcAlt;
          })
          .arcStroke((e: { status: never; }) => {
            return e.status ? 0.5 : 0.3
          })
          .arcDashLength(0.9)
          .arcDashGap(2)
          .arcDashAnimateTime(1000)
          .arcsTransitionDuration(1000)
          .arcDashInitialGap((e: { order: number; }) => e.order)
          .labelsData(airportHistory.airports)
          .labelColor(() => "#ffcb21")
          .labelDotOrientation((e: { text: string; }) => {
            return e.text === "ALA" ? "top" : "right";
          })
          .labelDotRadius(0.3)
          .labelSize((e: { size: never; }) => e.size)
          .labelText("city")
          .labelResolution(6)
          .labelAltitude(0.01)
          .pointsData(airportHistory.airports)
          .pointColor(() => "#ffffff")
          .pointsMerge(true)
          .pointAltitude(0.07)
          .pointRadius(0.05);


    })


    Globe.rotateY(-Math.PI * (5 / 9));
    Globe.rotateZ(-Math.PI / 6);
    const globeMaterial = Globe.globeMaterial();
    globeMaterial.color = new Color(0x3a228a);
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    scene.add(Globe);

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);

    const onMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Example: Log the mouse coordinates or use them for something
      console.log("Mouse X:", mouseX, "Mouse Y:", mouseY);
    };

    document.addEventListener("mousemove", onMouseMove);




    const animate = () => {
      camera.lookAt(scene.position);
      controls.update();
      // renderer.render(scene, camera);
      composer.render()
      Globe.rotation.y += 0.002;
      requestAnimationFrame(animate);
    };

    // Stars (might use)

    // function addStar(){
    //   const geometry = new THREE.SphereGeometry(0.10, 100, 100)
    //   const material = new THREE.MeshStandardMaterial( {color: 0xffffff })
    //   const star = new THREE.Mesh(geometry, material)
    //
    //   const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 10000 ))
    //
    //   star.position.set(x,y,z)
    //   scene.add(star)
    //
    // }
    // Array(200).fill().forEach(addStar)


    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", onMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default App;