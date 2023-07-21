import * as THREE from 'https://threejs.org/build/three.module.js';

let scene, camera, renderer;
let mouse = new THREE.Vector2();
let line;

init();
animate();

function init() {
    scene = new THREE.Scene();
    // Use an orthographic camera for 2D space
    camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 1000);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    let geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
    ]);

    line = new THREE.Line(geometry, material);
    scene.add(line);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);
}

function onWindowResize() {
    camera.left = -window.innerWidth / 2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = -window.innerHeight / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouse.x = event.clientX - window.innerWidth / 2;
    mouse.y = -(event.clientY - window.innerHeight / 2);

    // update line with mouse position
    line.geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(mouse.x, mouse.y, 0)
    ]);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
