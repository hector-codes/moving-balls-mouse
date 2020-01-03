const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/** @type {CanvasRenderingContext2D} */
const c = canvas.getContext('2d');
const deg = Math.PI / 180;
const mouse = {
    x: undefined,
    y: undefined,
};

const colors = [
    '#28364A',
    '#FFEED6',
    '#F7C45F',
    '#D65353',
    '#2D5C5C',
];

const helpers = {
    trackMouseMove: function(e) {
        mouse.x = e.x;
        mouse.y = e.y
    },

    handleResize: function(e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    },

    random: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
}

class Object {
    constructor(x, y, dx=0, dy=0, r=50) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = this.originalR = r;
        // this.color = `#${Math.floor(Math.random() * 255 * 255 * 255).toString(16)}`;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    };

    draw() {
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 360 * deg, false);
        c.fill();
    };

    update() {
        if (this.x > window.innerWidth - this.r || this.x < this.r) {
            this.dx = -this.dx;
        }
        if (this.y > window.innerWidth - this.r || this.y < this.r) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if ( 
            mouse.x - this.x < 100 && mouse.x - this.x > -100 &&
            mouse.y - this.y < 100 && mouse.y - this.y > -100
        ) {
            if ( this.r < 70 ) {
                this.r += 4;
            }
        } else if ( this.r > this.originalR ) {
            this.r -= 4;
        }
        this.draw();
    };
}

let objects = [];

animate = function() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for( let i = 0; i < objects.length; i++) {
        objects[i].update();
    }
}

init = function(n) {
    objects = [];

    for(let i = 0; i < 100; i++) {
        let x = Math.floor(50 + Math.random() * (window.innerWidth - 99));
        let y = Math.floor(50 + Math.random() * (window.innerHeight - 99));
        let dx = (Math.random() - 0.5) * 1;
        let dy = (Math.random() - 0.5) * 1;
    
        objects.push( new Object( x, y, dx, dy, helpers.random(10, 20) ) );
    }
}

window.addEventListener( 'mousemove', helpers.trackMouseMove, );
window.addEventListener( 'resize', helpers.handleResize );

init();
animate();
