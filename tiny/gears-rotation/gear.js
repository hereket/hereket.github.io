function rotateElement(elem, angle) {
    var bbox = elem.getBBox();

    var x = bbox.x;
    var y = bbox.y;
    var width = bbox.width;
    var height = bbox.height;
    var middleX = x + width/2;
    var middleY = y + height/2;

    var str = "" + angle + "," + middleX + "," + middleY;
    elem.setAttribute("transform", "rotate(" + str + ")");
}

function getScrollY() {
    var  scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
        scrOfY = window.pageYOffset;
    } else if( document.body && document.body.scrollTop )  {
        scrOfY = document.body.scrollTop;
    } 
    return scrOfY;
}

document.addEventListener('DOMContentLoaded', function() {
    var b1 = document.getElementById('p1');
    var b2 = document.getElementById('p2');
    
    var b3 = document.getElementById('p3');
    var b4 = document.getElementById('p4');

    var b5 = document.getElementById('p5');
    var b6 = document.getElementById('p6');
    var b7 = document.getElementById('p7');

    var b8 = document.getElementById('p8');

    // var test = 1;
    // setInterval( function() {
    //     test += 0.05;
    //
    //     rotateElement(b1, test);
    //     rotateElement(b2, -test);
    //
    //     rotateElement(b3, test);
    //     rotateElement(b4, -test);
    //
    //     rotateElement(b5, -test/2);
    // }, 1);



    var lastKnownScrollPosition = 0;
    var scrollTicking = false;
    document.addEventListener('scroll', function(e) {
        // lastKnownScrollPosition = window.scrollY;
        lastKnownScrollPosition = getScrollY();

        if(!scrollTicking) {
            window.requestAnimationFrame(function() {
                lastKnownScrollPosition

                var pos = lastKnownScrollPosition/10;
                pos *= 3;

                rotateElement(b1, pos);
                rotateElement(b2, -pos);

                rotateElement(b3, -pos);
                rotateElement(b4, -pos);

                rotateElement(b5, -pos);

                scrollTicking = false;
            });
        }

        scrollTicking = true;
    });
});
