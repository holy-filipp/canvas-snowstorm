var cvs = document.getElementById('canvas');
cvs.width = window.innerWidth;
cvs.height = window.innerHeight - 10;
var ctx = cvs.getContext('2d');
var particles = [];
var WIND_DIRECTION = 0;

window.addEventListener('mousemove', (e) => {
    const w = window.innerWidth / 2;
    const h = (window.innerHeight - 10) / 2;
    const x = e.clientX;
    const y = e.clientY;
    const deltaX = w - x;
    const deltaY = h - y;
    const rad = Math.atan2(deltaX, deltaY);
    var deg = Math.round(rad * (180 / Math.PI)) + 90;

    if(deg < 0) {
        deg = (deg + 360) % 360;
    }

    WIND_DIRECTION = deg * Math.PI / 180;
});

var particlesCount = 450;
var maxRadius = 4;
var minRadius = 1;
var maxWindSpeed = 0.9;
var gravitation = 0.1;

function generateParticles() {
    for(i = 0; i < particlesCount; i++) {
        particles[i] = {
            x: Math.random() * cvs.width,
            y: Math.random() * cvs.height,
            rad: Math.floor(Math.random() * (maxRadius - minRadius) + minRadius),
            wind: Math.random() * maxWindSpeed,
        };
    }
}

function moveParticle(id) {
    particles[id].x = particles[id].x + (particles[id].wind * Math.cos(WIND_DIRECTION)) / particles[id].rad;
    particles[id].y += gravitation * particles[id].rad;

    if(particles[id].x > cvs.width + particles[id].rad) {
        particles[id].x = -particles[id].rad;
    }

    if(particles[id].x < -particles[id].rad) {
        particles[id].x = cvs.width + particles[id].rad;
    }

    if(particles[id].y > cvs.height) {
        particles[id].x = Math.random() * cvs.width;
        particles[id].y = -particles[id].rad;
    }
}

var start = null;

function draw(timestamp) {
    if(!start) start = timestamp;
    var progress = timestamp - start;
    ctx.fillStyle = 'white';
    if( progress > 5 ) {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        for(i = 0; i < particles.length; i++) {
            ctx.beginPath();
            ctx.arc(particles[i].x, particles[i].y, particles[i].rad, 0, 2 * Math.PI);
            ctx.fill();
            moveParticle(i);
        }
        start = timestamp;
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
generateParticles();