import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.TetrahedronGeometry(1, 0);
  const material = new THREE.MeshStandardMaterial({ color: 0xff6781 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(50).fill().forEach(addStar);

// Background
import spaceImg from './space.jpg'


const spaceTexture = new THREE.TextureLoader().load(spaceImg);
scene.background = spaceTexture;

// Avatar

import erikImg from './erik.jpg'

const erikTexture = new THREE.TextureLoader().load(erikImg);

const erik = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: erikTexture }));

scene.add(erik);

// Mars

import marsImg from './mars.jpg';
import normalImg from './normal.jpg';

const marsTexture = new THREE.TextureLoader().load(marsImg);
const normalTexture = new THREE.TextureLoader().load(normalImg);

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
);

scene.add(mars);

mars.position.z = 30;
mars.position.setX(-10);

erik.position.z = -5;
erik.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;

  erik.rotation.y += 0.01;
  erik.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  mars.rotation.x += 0.005;

  erik.rotation.x += 0.005;
 

  // controls.update();

  renderer.render(scene, camera);
}

animate();

