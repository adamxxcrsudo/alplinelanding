// script.js
// Countdown
const targetDate = new Date('2026-08-01T17:00:00Z'); // 18:00 BST = 17:00 UTC

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    const countdownEl = document.getElementById('countdown');
    const liveEl = document.getElementById('launch-live');

    if (diff <= 0) {
        countdownEl.classList.add('hidden');
        liveEl.classList.remove('hidden');
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Snowfall
function createSnowfall() {
    const canvas = document.getElementById('snowfall');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    const particles = [];
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.size = Math.random() * 5 + 2;
            this.speed = Math.random() * 1.5 + 0.8;
            this.opacity = Math.random() * 0.7 + 0.4;
            this.xSpeed = Math.random() * 0.8 - 0.4;
        }
        
        update() {
            this.y += this.speed;
            this.x += this.xSpeed;
            
            if (this.y > height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < 180; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.update();
            p.draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Form handling (simulated - Brevo handles real submission)
function setupForm() {
    const form = document.getElementById('waitlist-form');
    const success = document.getElementById('form-success');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        
        if (!email || !email.includes('@')) {
            alert("Please enter a valid email address.");
            return;
        }
        
        // In production, you would submit to Brevo here
        // For demo, show success
        form.classList.add('hidden');
        success.classList.remove('hidden');
        
        // Simulate incrementing waitlist
        let count = 2847;
        const countEl = document.getElementById('waitlist-number');
        
        const interval = setInterval(() => {
            count++;
            countEl.textContent = count.toLocaleString('en-US');
            if (count > 2865) clearInterval(interval);
        }, 120);
    });
}

// Fake live waitlist counter
function animateWaitlist() {
    let count = 2847;
    const el = document.getElementById('waitlist-number');
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            count += Math.floor(Math.random() * 3) + 1;
            el.textContent = count.toLocaleString('en-US');
        }
    }, 4500);
}

// Initialize
window.onload = function() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    createSnowfall();
    setupForm();
    animateWaitlist();
    
    // Gentle fade in for hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1.8s ease';
        heroContent.style.opacity = '1';
    }, 300);
};
