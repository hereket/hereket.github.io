
document.addEventListener('DOMContentLoaded', function() {
    var htmlBody = document.getElementsByTagName('body')[0];
    var canvas = document.getElementById("light");
    canvas.width = htmlBody.clientWidth;
    canvas.height = htmlBody.offsetHeight;
    var context = canvas.getContext('2d');

    var Mouse = {x: 0, y:0};
    var Center = {
        x: canvas.width / 2,
        y: canvas.height /2,
    }

    var segments = [
        { a:{x:0 , y:0 }, b: {x: canvas.width , y:0 } },
        { a:{x:canvas.width , y:0 }, b: {x: canvas.width , y: canvas.height } },
        { a:{x:canvas.width , y:canvas.height }, b: {x:0 , y:canvas.height } },
        { a:{x:0 , y:canvas.height }, b: {x:0 , y:0 } },
    ];
    

    var svg = document.getElementById('logo');
    var layer = svg.getElementById('logo-layer1');
    var polygons = layer.getElementsByTagName('polygon');
    
    var scale = 8;
    var center = 150;
    var dimension = [-273.27, -493.34];
    polygons = normalize(polygons, dimension, scale, center);

    var test = polygonsToSegments(polygons);
    segments = segments.concat(test);

    draw(context, polygons);
    drawPointer(context, 100, 100);
    drawLoop();

    canvas.addEventListener('mousemove', function(e) {
        // var rect = canvas.getBoundingClientRect();
        // var x = e.clientX - rect.left;
        // var y = e.clientY - rect.top;
        Mouse.x = e.clientX;
        Mouse.y = e.clientY;
        updateCanvas = true;

        // var width = canvas.width;
        // var height = canvas.height;
        // context.clearRect(0,0,width,height);

        // drawPointer(context, Mouse.x, Mouse.y);
    });

    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame||
        window.msRequestAnimationFrame;
    var updateCanvas = false;
    function drawLoop(){
        requestAnimationFrame(drawLoop);
        if(updateCanvas) {
            var width = canvas.width;
            var height = canvas.height;
            context.clearRect(0,0,width,height);
            draw(context, polygons);
            drawPointer(context, Mouse.x, Mouse.y);
            drawRay(context, segments, Center, Mouse);
            updateCanvas = false;
        }

    }
});

// First of all this function normalizes the polygons ponts.
// Inkscape add transform to groupd of objects. 
// scale  - used to size up/down polygons size
// center - for padding
function normalize(polygons, dim, scale, center) {

    for(var pindex = 0; pindex < polygons.length; pindex++) {
        var points = polygons[pindex].points;
        for(var pointIndex = 0; pointIndex < points.length; pointIndex++) {
            var point = points[pointIndex];

            polygons[pindex].points[pointIndex].x = ( point.x + dim[0] ) * scale + center;
            polygons[pindex].points[pointIndex].y = ( point.y + dim[1] ) * scale + center;
        }
    }

    return polygons;
}


function draw(context, polygons) {
    // context.fillStyle = '#eee';
    context.fillStyle = '#444';
    context.beginPath();

    for(var polyIndex = 0; polyIndex < polygons.length; polyIndex++){
    // for(var polyIndex = 0; polyIndex < 2; polyIndex++){
        var points = polygons[polyIndex].points;
        var p0 = points[0];
        
        context.moveTo(p0.x , p0.y );

        for(var pointIndex = 1; pointIndex < points.length; pointIndex++) {
            var point = points[pointIndex];
            context.lineTo(point.x, point.y) ;
        }
    }

    context.closePath();
    context.fill();
}


function drawPointer(context, x, y)
{
    context.fillStyle = '#dd3838';
    // context.fillStyle = '#eee';
    context.beginPath();


    context.arc(x, y, 3, 0, 2*Math.PI, false);
    context.closePath();
    context.fill();
}

function drawRay(context, segments, Center, Mouse)
{

    var intersects = [];
    for(var angle = 0; angle < Math.PI*2; angle += ((Math.PI*2)/50)) {
        var dx = Math.cos(angle);
        var dy = Math.sin(angle);

        var ray = {
            a: {x:Mouse.x, y:Mouse.y},
            b: {x:Mouse.x+dx, y:Mouse.y+dy}
        };

        var closestIntersect = null;
        for(var i = 0; i < segments.length; i++) {
            var intersect = getIntersection(ray, segments[i]);
            if(!intersect) continue;
            if(!closestIntersect || intersect.param < closestIntersect.param) {
                closestIntersect = intersect;
            }
        }
        
        intersects.push(closestIntersect);
    }

    // context.strokeStyle = 'dd3838';
    context.strokeStyle = 'dd3838';
    context.fillStyle = 'dd3838';
    for(var i=0; i<intersects.length; i++) {
        var intersect = intersects[i];

        context.beginPath();
        context.arc(intersect.x, intersect.y, 3, 0, 2*Math.PI, false);
        context.lineTo(intersect.x, intersect.y);
        context.fill();
        context.stroke();
    }

    context.strokeStyle = '#dd3838';
    context.fillStyle = '#dd3838';
    for(var i=0; i<intersects.length; i++) {
        var intersect = intersects[i];

        context.beginPath();
        context.moveTo(Mouse.x, Mouse.y);
        context.lineTo(intersect.x, intersect.y);
        context.stroke();
    }


    // drawPointer(context, Center.x, Center.y);
    drawPointer(context, intersect.x, intersect.y);
}

function getIntersection(ray, segment)
{
    // RAY:
    var r_px = ray.a.x;
    var r_py = ray.a.y;
    var r_dx = ray.b.x - ray.a.x;
    var r_dy = ray.b.y - ray.a.y;

    // SEGMENT
    var s_px = segment.a.x;
    var s_py = segment.a.y;
    var s_dx = segment.b.x - segment.a.x;
    var s_dy = segment.b.y - segment.a.y;

    // Check if parallel. If the are then cannot intersect.
    var r_mag = Math.sqrt(r_dx*r_dx + r_dy*r_dy);
    var s_mag = Math.sqrt(s_dx*s_dx + s_dy*s_dy);
    if(r_dx/r_mag == s_dx/s_mag && r_dy/r_mag == s_dy/s_mag){
        return null; // They are parallel
    }

    var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px - s_px))
        / (s_dx*r_dy - s_dy*r_dx);
    var T1 = (s_px + s_dx*T2 - r_px) / r_dx;

    // Must be within parametric constrains of ray/segment
    if(T1<0) return null;
    if(T2<0 || T2>1) return null;

    // point of intersection
    return {
        x: r_px + r_dx * T1,
        y: r_py + r_dy * T1,
        param: T1,
    };
}

function polygonsToSegments(polygons){
    var segments = []; 
    
    for(var polyIndex = 0; polyIndex < polygons.length; polyIndex++) {
        var points = polygons[polyIndex].points;
        for(var pointIndex = 0; pointIndex < points.length; pointIndex++){
            var p1 = points[pointIndex];
            var p2 = (pointIndex < points.length - 1) ? points[pointIndex + 1] : points[0];
            segments.push({
                a: {x: p1.x, y:p1.y},
                b: {x: p2.x, y:p2.y},
            });
        }
    }

    return segments;
}
