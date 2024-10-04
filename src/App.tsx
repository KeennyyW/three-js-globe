import './App.css';
import * as THREE from 'three';
import { useEffect } from 'react';
import './App.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ThreeGlobe from 'three-globe';


function App() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50, 
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas, 
      antialias: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = false;

    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

  

    function initGlobe() {
      const Globe = new ThreeGlobe();

      const globeMaterial = Globe.globeMaterial();
      globeMaterial.color = new THREE.Color(0x3a228a);
      globeMaterial.emissive = new THREE.Color(0x220038);
      globeMaterial.emissiveIntesity = 0.1;
      globeMaterial.shininess = 0.7;
      
      scene.add(boxMesh);
    }

    scene.background = new THREE.Color(0x040d21);

    scene.add(boxMesh);

    const animate = () => {
      boxMesh.rotation.x += 0.006;
      boxMesh.rotation.y += 0.006;

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <>
      <div className='App'>
        <canvas className='canvas' id='myThreeJsCanvas'></canvas>
      </div>
    </>
  );
}

export default App;
