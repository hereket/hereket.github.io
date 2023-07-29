// var customSeed = 6;
var customSeed = 32;
Math.seed = customSeed;


// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
}

test_wrapper = 0;

document.addEventListener("DOMContentLoaded", function(event) { 
    var canvas = document.getElementById('canvas_tree');
    var wrapper = document.getElementById('section_tree');
    ctx = canvas.getContext('2d');

    test_wrapper = wrapper;

    // TODO: resize canvas on window resize
    
    setTimeout(function(){ 
        canvas.width = wrapper.offsetWidth - 20;
        canvas.height = wrapper.offsetHeight - 3;

        var height = canvas.height;
        var width = canvas.width;

        wrapper.addEventListener("mousemove", function(event) { 
            Math.seed = customSeed;

            var data = getAngleFromMouse(canvas, event);
            drawTreeOuter(ctx, width, height, data.angle, data.norm);
        });

        wrapper.addEventListener("click", function(event) { 
            customSeed = (Math.random() * 10000) >> 0;
            Math.seed = customSeed;
            var data = getAngleFromMouse(canvas, event);
            drawTreeOuter(ctx, width, height, data.angle, data.norm);
        });

        drawTreeOuter(ctx, width, height, - Math.PI/2);
    }, 200);
});

function getAngleFromMouse(canvas, e)
{
    var canvasRect = canvas.getBoundingClientRect();
    var x1 = canvasRect.x + (canvasRect.width / 2);
    var y1 = canvasRect.y + canvasRect.height;

    var x2 = e.clientX;
    var y2 = e.clientY;

    var angleFromMouse = Math.atan2(y2 - y1, x2 - x1);
    var norm = normalize(angleFromMouse, -Math.PI, 0);

    var maxRotateAngle = Math.PI/40;
    angle = -Math.PI/2 + maxRotateAngle * norm;
    return( {'angle':angle, 'norm': norm});
}

function drawTreeOuter(ctx, width, height, angle, norm)
{
    if(!norm) {
        norm = 0;
    }

    // ctx.fillStyle = "rgba(0,0,0, 0.3)"; // background color;
    ctx.fillStyle = "rgba(155, 102, 238, 0.9)"; // background color;
    // ctx.fillRect(0,0,width, height);
    ctx.clearRect(0,0,width, height);
    // drawTree(width/4, height, height/11, angle, 9, 4, norm);
    // drawTree(width/4, height, 80, angle, 9, 4, norm);
    drawTree(width/2, height, 80, angle, 9, 4, norm);
}

// Normalize between -1 and 1 
// and then reverse to make -1 to be left
// and 1 to be right
function normalize(value, max, min) {
    result = 2 * ((value - min) / (max - min)) - 1;
    result *= -1;
    return result;
}





function drawTree(startX, startY, length, angle, depth, branchWidth, norm) {
    // var rand = Math.random;
    var rand = Math.seededRandom;
    var newLength, newAngle, newDepth, maxBranch = 3,
        endX, endY, maxAngle = 2 * Math.PI / 6, subBranches;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    endX = startX + length * Math.cos(angle);
    endY = startY + length * Math.sin(angle);

    ctx.lineWidth = branchWidth;
    ctx.lineTo(endX, endY);

    if (depth <= 2) {
        color = (((rand() * 220) + 32) >> 0);
    }
    else {
        color = (((rand() * 220) + 8) >> 0);
    }

    function bound(value, min, max) {
        var result = value;
        if(value < min) { result = min; }
        if(value > max) { result = max; }
        return value;
    }

    // orange = rgba(254, 191, 81, 1)
    // purple = rgba(155, 102, 238, 1)
    //
    // var range = 100;
    // var shift = -(range/2) + (rand() * range);
    // var R = bound(44 + shift);
    // var G = bound(43 + shift);
    // var B = bound(59  + shift);

    newDepth = depth - 1;

    if(newDepth == 1)
    {
        subBranches = (rand() * (maxBranch - 1)) + 1;
        branchWidth *= 3; 
    } else {
        subBranches = (rand() * (maxBranch - 1)) + 1;
        branchWidth *= 0.7;
    }

    if(newDepth < 1){
        ctx.strokeStyle = 'rgb(' + color + ',' + 200 + ',' + color + ')';
        // ctx.strokeStyle = 'rgb(' + R + ',' +  255 + ',' +  B + ')';
        // ctx.strokeStyle = 'rgb(' + 254 + ',' +  191 + ',' +  81 + ')';
    } else {
        ctx.strokeStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
        // ctx.strokeStyle = 'rgb(' + R + ',' +  G + ',' +  B + ')';
    }

    ctx.stroke();
    if(newDepth < 1 ) {
        return;
    }


    var angleCoef = depth*5;

    for (var i = 0; i < subBranches; i++) {
        newAngle = angle + rand() * maxAngle - maxAngle * 0.5;
        // newAngle = newAngle + norm;
        newAngle = newAngle + (norm * Math.PI/angleCoef);
        newLength = length * (0.7 + rand() * 0.3);
        drawTree(endX, endY, newLength, newAngle, newDepth, branchWidth, norm);
    }

}
