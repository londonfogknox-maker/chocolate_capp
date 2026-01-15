// Wait for the document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SETUP ---
    // Scene: The container for all our 3D objects
    const scene = new THREE.Scene();

    // Camera: How we view the scene. PerspectiveCamera mimics the human eye.
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5; // Move the camera back a bit so we can see the scene

    // Renderer: This draws the scene onto the screen.
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha:true makes the background transparent
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create a canvas element and style it to be a fixed background
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1'; // Crucial: Place the canvas BEHIND all other content

    // Add the canvas to the HTML body
    document.body.appendChild(canvas);

    // --- 2. CREATE THE PARTICLES ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000; // The number of particles

    const positions = new Float32Array(particlesCount * 3); // Each particle has 3 values (x, y, z)

    for (let i = 0; i < particlesCount * 3; i++) {
        // Create particles in a large random sphere
        positions[i] = (Math.random() - 0.5) * 10; 
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material: What the particles look like.
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.006,
        color: 0x74b294,
    });

    // The final particles object (a "Points" object in Three.js)
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // --- 3. ANIMATION ---
    // We need a clock to have smooth, frame-rate independent animation
    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Animate the particles
        // We'll make them rotate slowly for a simple, elegant effect
        particles.rotation.y = elapsedTime * 0.05;
        particles.rotation.x = elapsedTime * 0.02;

        // Render the scene from the camera's perspective
        renderer.render(scene, camera);

        // Call the animate function again on the next frame
        window.requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    // --- 4. HANDLE WINDOW RESIZING ---
    window.addEventListener('resize', () => {
        // Update camera aspect ratio
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // Update renderer size
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
