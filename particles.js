// control particles (dust and ripples)

class Particle {

    // setup class for particle that creates objects for x and y axis

    constructor(x, y) {
        this.x = x + 25;
        this.y = y + 25;
        this.radius = Math.random() * 20 + 1; 
        this.opacity = 1;
        this.directionX = Math.random() *1 - 0.5;
        this.directionY = Math.random() * 1 -0.5;

    }

    // draw the dust
    draw(){
        ctx3.fillStyle = 'rgba(150, 150, 150, ' + this.opacity + ')';
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        ctx3.fill();
        ctx3.closePath();
    }
    // update for each time the frogger moves
    update() {
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.opacity > 0.1 ) {
            this.opacity -= 0.9;
        }
        if (this.radius > 0.15) {
            this.radius -= 0.14;
        }
    }

    

    // draw ripples

    drawRipples(){
        ctx3.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI *2)
        ctx3.stroke();
        ctx3.closePath();
    }

    // update for each time the frogger moves
     ripple() {
        if (this.radius < 50) {
            this.radius += 0.7;
            this.x -= 0.009;
            this.y -= 0.009;
        }
        if (this.opacity > 0) {
            this.opacity -= 0.03;
        }


    }
}


function handleParticles() {
    // dust particles
    
    for(let i =0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    if (particlesArray.length > maxParticles) {
        for (let i = 0; i < 30; i++) {
            particlesArray.pop();
        }
    }

    if (((keys[37] || keys[38] || keys[39] || keys[40])) && frogger.y > 250 && particlesArray.length < maxParticles + 10) {
        for (let i = 0; i < 10; i++) {
            particlesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
}

    // water ripples
    
    function handleRipples() {

    for(let i =0; i < ripplesArray.length; i++) {
        ripplesArray[i].ripple();
        ripplesArray[i].drawRipples();
    }
    if (ripplesArray.length > 20) {
        for (let i = 0; i < 5; i++) {
            ripplesArray.pop();
        }
    }
    if (((keys[37] || keys[38] || keys[39] || keys[40])) && frogger.y < 250 && frogger.y > 100) {
        for (let i = 0; i < 10; i++) {
            ripplesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
}


    
