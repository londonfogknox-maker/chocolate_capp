document.addEventListener('DOMContentLoaded', () => {

    // Add the author's list of theme words here
    const themeWords = [
        "historical fiction", "psychology", "sweet & sad", "pushes your perspective", "romance", "happy & light",
        "cold & misty", "nature", "dark corners", "unique narration", "mystery", "humor",
        "heartfelt", "reflective", "multilayered", "cozy", "sexual", "ghost story"
    ];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const fontLoader = new THREE.FontLoader();
    const fontURL = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';

    fontLoader.load(fontURL, (font ) => {
        // This function runs once the font is loaded
        createWords(font);
    });

    const wordsGroup = new THREE.Group(); // A group to hold all our word meshes
    scene.add(wordsGroup); 

    // Define the horizontal boundary for our world
const X_BOUNDARY = 15;

    function createWords(font) {
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCCFF }); // Periwinkle color

        themeWords.forEach(word => {
            const textGeometry = new THREE.TextGeometry(word, {
                font: font,
                size: 0.25,  // Size of the text
                height: 0.02, // Thickness of the 3D text
            });

            // Center the text geometry so it rotates around its middle
            textGeometry.center();
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
                // Decide if the word starts on the left or right
        const startsOnLeft = Math.random() > 0.5;

        if (startsOnLeft) {
            // Start on the left side, just off-screen
            textMesh.position.x = -X_BOUNDARY;
            // Give it a positive velocity to move right
            textMesh.userData.velocity = new THREE.Vector3(0.01, 0, 0);
        } else {
            // Start on the right side, just off-screen
            textMesh.position.x = X_BOUNDARY;
            // Give it a negative velocity to move left
            textMesh.userData.velocity = new THREE.Vector3(-0.01, 0, 0);
        }

        // Give it a random height (Y position) and depth (Z position)
        textMesh.position.y = (Math.random() - 0.5) * 15;
        textMesh.position.z = (Math.random() - 0.5) * 10;

        // Keep a slight tilt for visual interest
        textMesh.rotation.z = (Math.random() - 0.5) * 0.2;
    
            wordsGroup.add(textMesh);
        });
    }

    const clock = new THREE.Clock();

    const animate = () => {
        wordsGroup.children.forEach(word => {
        // Add the word's velocity to its position on each frame
            word.position.x += word.userData.velocity.x;

            // --- NEW "WRAP AROUND" LOGIC FOR HORIZONTAL MOVEMENT ---
            const velocityX = word.userData.velocity.x;
    
            // If the word is moving right and goes past the right boundary...
            if (velocityX > 0 && word.position.x > X_BOUNDARY) {
                // ...reset it to the left boundary.
                word.position.x = -X_BOUNDARY;
                // Give it a new random height and depth for variety
                word.position.y = (Math.random() - 0.5) * 15;
                word.position.z = (Math.random() - 0.5) * 10;
            }
    
                // If the word is moving left and goes past the left boundary...
            else if (velocityX < 0 && word.position.x < -X_BOUNDARY) {
                // ...reset it to the right boundary.
                word.position.x = X_BOUNDARY;
                // Give it a new random height and depth for variety
                word.position.y = (Math.random() - 0.5) * 15;
                word.position.z = (Math.random() - 0.5) * 10;
            }
        });

        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    // --- HANDLE RESIZING ---
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});    