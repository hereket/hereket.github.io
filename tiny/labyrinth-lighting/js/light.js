
//                                window.mozRequestAnimationFrame || window.msRequestAnimationFrame;



// DANGER: This is highly alpha code, 
// TODO: prepare for production
// TODO: refactor, ...

// color_polygon = '#122657';
// color_polygon = '#dd2828';
// color_light = '#dd3838';
// color_background = '#122647';

// #f6b940 #efc397 #8873b6
// #e5cabe #d9bb6 #64339e       // GOOOD
// #427097 #d6e197 #5bb9c2
// #ee4d34 #6740ad #f8f5d2
// #fbf086 #f25b77 #c04866
// #365c80 #de43ad #202077
// #228ace #d5e597 #2d78a2
// #6775ea #735d58 #573973
// #9cba88 #90ea37 #5c5545
// #484973 #111443 #d4ca95
// #2c2fd9 #e58449 #4d2c55
// #e1f9cf #bd3d19 #481b17
// #27ac3e #dbb4a #374b5d
// #e3a930 #f4ce45 #f83f5c

// color_polygon = '#e5cabe';
// color_light = '#dd3838';
// color_background = '#122647';

color_polygon = '#002255';
color_light = '#f8f8f8';
// color_light = '#fff5f9';
color_background = '#dce7f6';
// color_background = '#fff6d5';


// color_polygon = randomColor();
// color_light = randomColor();
// color_background = randomColor();


window.addEventListener('resize', function(e) {
    // console.log("resize");
    // var canvas = document.getElementById("canvas_light");
    // var wrapper_body = document.getElementById('section_top');
    // canvas.width = wrapper_body.offsetWidth;
    // canvas.height = wrapper_body.offsetHeight;
});

document.addEventListener('DOMContentLoaded', function() {

    setTimeout(function(){ 
        init_light();
    }, 100);

    // window.addEventListener('resize', function() {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     draw_polygons(context, polygons);;
    //     drawRay(context, segments, Center, Mouse);
    // });

});

function init_light() {
    var wrapper_body = document.getElementById('section_top');
    var canvas = document.getElementById("canvas_light");
    var context = canvas.getContext('2d');

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;


    // TODO: using settimeout to get correct size of div, make better research
    // and do better than that

    canvas.width = wrapper_body.offsetWidth;
    canvas.height = wrapper_body.offsetHeight;

    context.fillStyle = color_background;
    context.fillRect(0,0,canvas.width, canvas.height);
    // context.shadowColor = 'black';
    // context.shadowBlur = 2;

    var pad = 10;
    var Mouse = {x: getRandomInt(pad, canvas.width - pad), 
        y: getRandomInt(pad, canvas.height - pad)};

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
    var polygons = svg.getElementsByTagName('polygon');

    var padding = {x: canvas.width * 0.1, y: canvas.height * 0.1};
    // var dimension = [-1.9022006,-18.579883]
    var dimension = [-1,1]
    var dimension_scale = [0.6,0.6]
    polygons = normalize_to_scale(polygons, dimension, dimension_scale, padding, canvas.width, canvas.height);

    var segmentsFromPolygons = polygonsToSegments(polygons);
    segments = segments.concat(segmentsFromPolygons);


    wrapper_body.addEventListener('mousemove', function(e) {
        var Mouse = getMousePos(canvas, e);
        // Mouse.x = e.clientX;
        // Mouse.y = e.clientY;

        var width = canvas.width;
        var height = canvas.height;
        // context.clearRect(0,0,width,height);
        context.fillStyle = color_background;
        context.fillRect(0,0,width,height);
        // context.shadowOffsetY = 5;

        draw_polygons(context, polygons);;
        drawRay(context, segments, Center, Mouse);
    });

    draw_polygons(context, polygons);;
    drawRay(context, segments, Center, Mouse);

}


function draw_polygons(context, polygons) {
    context.fillStyle = color_polygon; 
    context.beginPath();

    for(var polyIndex = 0; polyIndex < polygons.length; polyIndex++){
        // for(var polyIndex = 0; polyIndex < 1; polyIndex++){
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


// First of all this function normalizes the polygons ponts.
// dim = the points are wrong, make it start from 0,0 by correcting ...
// scale  - used to size up/down polygons size
// center - for padding
function normalize_to_scale(polygons, dim, dim_scale, padding, width, height) {
    // console.log(dim, dim_scale, padding, width, height); 
    var x_max = 0;
    var y_max = 0;
    new_width = width - ( padding.x * 2 );
    new_height = height;// - ( padding.y * 2 );

    for(var pindex = 0; pindex < polygons.length; pindex++) {
        var points = polygons[pindex].points;
        for(var pointIndex = 0; pointIndex < points.length; pointIndex++) {
            var point = points[pointIndex];
            point.x += dim[0]; 
            point.y += dim[1]; 

            if(point.x > x_max) { x_max = point.x; }
            if(point.y > y_max) { y_max = point.y; }
        }
    }

    var scale_x = new_width / x_max * dim_scale[0];
    var scale_y = new_height / y_max * dim_scale[1];
    var scale = Math.min(scale_x, scale_y); 

    console.log(scale_x, scale_y, scale);
    // console.log(height/2 - y_max);

    // console.log(new_width, x_max, height, y_max);
    // console.log(scale_x, scale_y, scale);

    for(var pindex = 0; pindex < polygons.length; pindex++) {
        var points = polygons[pindex].points;
        for(var pointIndex = 0; pointIndex < points.length; pointIndex++) {
            var point = points[pointIndex];
            point.x = ( point.x ) * scale + padding.x;
            point.y = ( point.y ) * scale + new_height/2 - y_max*scale/2*1.5; // 1.5 is just made up number 
            // point.y = ( point.y ) * scale + (new_height/2 - y_max);
        }
    }

    return polygons;
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

function drawRay(context, segments, Center, Mouse)
{
    var points = (function(segments){
        var a = [];
        segments.forEach(function(seg) {
            a.push(seg.a, seg.b);
        });
        return a;
    })(segments);

    var uniquePoints = (function(points) {
        var set = {}; 
        return points.filter(function(p){
            var key = p.x + ',' + p.y; 
            if(key in set){
                return false;
            } else {
                set[key] = true;
                return true;
            }
        });
    })(points);

    var uniqueAngles = [];
    for(var j = 0; j < uniquePoints.length; j++) {
        var uniquePoint = uniquePoints[j];
        var angle = Math.atan2(uniquePoint.y - Mouse.y, uniquePoint.x - Mouse.x);
        // uniquePoint.angle = angle;
        uniqueAngles.push(angle - 0.00001, angle, angle + 0.00001);
    }

    var intersects = [];
    for(var j = 0; j < uniqueAngles.length; j++) {
        var angle = uniqueAngles[j];

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

        if(!closestIntersect) continue;
        closestIntersect.angle = angle;

        intersects.push(closestIntersect);
    }

    intersects = intersects.sort(function(a, b){
        return a.angle - b.angle;
    });

    // context.strokeStyle = 'dd3838';
    // context.strokeStyle = 'dd3838';
    // context.fillStyle = 'dd3838';
    // for(var i=0; i<intersects.length; i++) {
    //     var intersect = intersects[i];
    //
    //     context.beginPath();
    //     context.arc(intersect.x, intersect.y, 3, 0, 2*Math.PI, false);
    //     context.lineTo(intersect.x, intersect.y);
    //     context.fill();
    //     context.stroke();
    // }

    // context.strokeStyle = '#dd0000';
    context.fillStyle = '#dd3838';
    context.fillStyle = color_light;
    // context.fillStyle = '#ffcc00';
    context.beginPath();
    context.moveTo(intersects[0].x, intersects[0].y);
    for(var i=1; i<intersects.length; i++) {
        var intersect = intersects[i];

        context.lineTo(intersect.x, intersect.y);
        // context.stroke();
    }
    context.closePath();
    context.fill();


    // drawPointer(context, Center.x, Center.y);
    // drawPointer(context, intersect.x, intersect.y);
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

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor()
{
    var R = getRandomInt(10,255).toString(16);
    var G = getRandomInt(10,255).toString(16);
    var B = getRandomInt(10,255).toString(16);
    return "#" + R + G + B;
}
