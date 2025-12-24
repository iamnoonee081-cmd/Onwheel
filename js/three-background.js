// Three.js Background Animation
let scene, camera, renderer, particles;
const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function initThreeBackground() {
    // Skip Three.js on very small screens or low-end devices for performance
    if (window.innerWidth < 480 || (isMobile && window.devicePixelRatio < 2)) {
        return;
    }
    
    const container = document.getElementById('canvas-container');
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: !isMobile, // Disable antialiasing on mobile for performance
        powerPreference: isMobile ? 'low-power' : 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Reduce pixel ratio on mobile for better performance
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio);
    
    container.appendChild(renderer.domElement);

    // Create floating particles
    createParticles();
    
    // Position camera
    camera.position.z = 5;
    
    // Start animation
    animate();
    
    // Mark as loaded
    container.classList.add('loaded');
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    // Reduce particle count on mobile
    const particleCount = isMobile ? 50 : 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        
        // Color (green variations)
        colors[i] = 0.1 + Math.random() * 0.3;     // R
        colors[i + 1] = 0.7 + Math.random() * 0.3; // G
        colors[i + 2] = 0.2 + Math.random() * 0.3; // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: isMobile ? 0.03 : 0.05,
        vertexColors: true,
        transparent: true,
        opacity: isMobile ? 0.4 : 0.6
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles slowly (slower on mobile)
    if (particles) {
        const rotationSpeed = isMobile ? 0.0005 : 0.001;
        particles.rotation.x += rotationSpeed;
        particles.rotation.y += rotationSpeed * 2;
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure container is ready
    setTimeout(initThreeBackground, 100);
});