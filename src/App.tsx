import React, { useEffect, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "./files/globe-data-min.json";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Color, DirectionalLight, PointLight } from "three";
import travelHistory from "./files/connections.json";
import airportHistory from "./files/DataCenters.json";

const ThreeCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<never>(null);

  useEffect(() => {

   



    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.5);
    scene.add(ambientLight);
    scene.background = new THREE.Color(0x040d21);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 120, 200);

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
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;

    controls.minDistance = 150;
    controls.maxDistance = 220;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = false;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    const renderScene = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.001,
      0.1
    );
    composer.addPass(bloomPass);

    globeRef.current = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.25);

    setTimeout(() => {
      globeRef.current
        .arcsData(travelHistory.connection)
        .arcColor((e: { status: never; }) => e.status ? "#7cd0ff" : "7cd0ff")
        .arcAltitude((e: { arcAlt: never; }) => e.arcAlt)
        .arcStroke((e: { status: never; }) => e.status ? 0.5 : 0.3)
        .arcDashLength(0.9)
        .arcDashGap(2)
        .arcDashAnimateTime(200)
        .arcsTransitionDuration(1000)
        .arcDashInitialGap((e: { order: number; }) => e.order)
        .labelsData(airportHistory.airports)
        .labelColor(() => "#ffcb21")
        .labelDotOrientation((e: { text: string; }) => e.text === "ALA" ? "top" : "right")
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
    }, 1000);

    globeRef.current.rotateY(-Math.PI * (5 / 9));
    globeRef.current.rotateZ(-Math.PI / 6);
    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(0x3a228a);
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    scene.add(globeRef.current);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);

    const animate = () => {
      camera.lookAt(scene.position);
      controls.update();
      composer.render();
      globeRef.current.rotation.y += 0.001;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{

        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

const App: React.FC = () => {
  return (
    <ThreeCanvas />
  );
};

export default App;
