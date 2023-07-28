var PERSPECTIVE = 0;
var PROJECTION_CENTER_X = 0;
var PROJECTION_CENTER_Y = 0;
var GLOBE_RADIUS = 0;
var DOT_RADIUS = 4;

var globalCanvas = 0;
var globalContext = 0;
var globalWidth = 0;
var globalHeight = 0;

var globalDots = []

class Dot {
    constructor() {
        this.phiRange = (Math.random() * 2) - 1;
        this.thetaRange = Math.random() * 2 * Math.PI;

        this.theta = this.thetaRange;
        this.phi = Math.acos(this.phiRange);

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.radius = 20;

        this.xProjected = 0;
        this.yProjected = 0;
        this.scaleProjected = 0;
    }

    project() {
        this.x = GLOBE_RADIUS * Math.sin(this.phi) * Math.cos(this.theta);
        this.y = GLOBE_RADIUS * Math.cos(this.phi);
        this.z = GLOBE_RADIUS * Math.sin(this.phi) * Math.sin(this.theta) + GLOBE_RADIUS;
        
        this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z);
        this.xProjected = (this.x * this.scaleProjected) + PROJECTION_CENTER_X;
        this.yProjected = (this.y * this.scaleProjected) + PROJECTION_CENTER_Y;
    }

    move() {
        var step = 0.009;

        // this.phiRange += step;
        // if(this.phiRange >= 1) {
        //     this.phiRange = -1;
        // }
        // this.phi = Math.acos(this.phiRange);

        this.thetaRange += step;
        if(this.thetaRange >= 2*Math.PI) {
            this.thetaRange = 0;
        }
        this.theta = this.thetaRange;
    }

    draw() {
        this.project();
        // globalContext.globalAlpha = Math.abs(1 - (this.z / globalWidth));

        globalContext.beginPath();
        globalContext.arc(this.xProjected, this.yProjected, DOT_RADIUS * this.scaleProjected, 0, Math.PI * 2);
        globalContext.fill();
    }
}

function render() {
    // globalContext.clearRect(0, 0, globalWidth, globalHeight);
    // globalContext.fillStyle = "rgba(155,100,255, 0.1)";
    // globalContext.fillStyle = "rgba(0,0,0, 0.05)";
    globalContext.fillStyle = "rgba(5,0,55, 0.05)";
    globalContext.fillRect(0, 0, globalWidth, globalHeight);

    globalContext.beginPath();
    // globalContext.fillStyle = "rgba(255,255,255)";
    // globalContext.strokeStyle = "rgba(255,255,255)";
    // globalContext.globalAlpha = 0.1;

    for(var i = 0; i < globalDots.length; i++) {

        globalDots[i].move();
        // globalDots[i].project();
        globalDots[i].draw();

        var nextIndex = i + 1;
        if(nextIndex >= globalDots.length) {
            nextIndex = 0;
        }

        var currentPoint = globalDots[i];
        var nextPoint = globalDots[nextIndex];

        globalContext.fillStyle = "rgba(255,255,255, 0.099)";
        globalContext.strokeStyle = "rgba(255,255,255, 0.049)";

        // globalContext.moveTo(currentPoint.xProjected, currentPoint.yProjected);
        // globalContext.lineTo(nextPoint.xProjected, nextPoint.yProjected);
        // globalContext.stroke();

        // globalContext.moveTo(PROJECTION_CENTER_X , PROJECTION_CENTER_Y);
        // globalContext.lineTo(currentPoint.xProjected, currentPoint.yProjected);
        //
        // globalContext.stroke();
    }

    window.requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", function() {
    globalCanvas = document.getElementById("sphere");
    globalWidth = globalCanvas.offsetWidth;
    globalHeight = globalCanvas.offsetHeight;

    globalCanvas.width = globalWidth;
    globalCanvas.height = globalHeight;

    globalContext = globalCanvas.getContext("2d");

    PERSPECTIVE = globalWidth * 0.8;
    PROJECTION_CENTER_X = globalWidth / 2;
    PROJECTION_CENTER_Y = globalHeight / 2;
    GLOBE_RADIUS = globalWidth / 3;
    
    for(var i = 0; i < 1800; i++) {
        globalDots.push(new Dot());
    }

    render(globalDots);
});
