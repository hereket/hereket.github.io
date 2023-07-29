function showContacts() {
    var key = 13;
    var contacts = document.getElementsByClassName('contact-item');

    var iteration = 100;
    var interval = 10;

    var runInterval = setInterval(function() {
        iteration -= 1;
        if(iteration <= 0) { clearInterval(runInterval); }

        for(var conI = 0; conI < contacts.length; conI++) {
            var row = contacts[conI]
            var val = row.getAttribute('data-contact');
            var result = "";
            var shift = key - parseInt(Math.random() * iteration);

            for(var charI = 0; charI < val.length; charI++) {
                var c = val[charI];
                var num = val.charCodeAt(charI);
                result += String.fromCharCode(num - shift);
            }

            contacts[conI].innerText = result;
        }


    }, interval)
}

function drawCenteredBox(context, canvasWidth, canvasHeight, proportion,  proportionX, proportionY) {
    var width = canvasWidth * proportion;
    var height = canvasHeight * proportion;
    var padX = ((canvasHeight - width) / 2) * (1 + proportionX);
    var padY = ((canvasHeight - height) / 2) * (1 + proportionY);

    context.fillRect(padX, padY, width, height);
}

function drawBoxes(canvas, context, proportionX, proportionY) {
    var canvasWidth = canvas.offsetWidth;
    var canvasHeight = canvas.offsetHeight;
    var boxMaxWidth = canvasWidth * 0.7;
    var boxMaxHeight = canvasHeight * 0.7;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgba(255, 255, 255, 0.27)";

    var num_boxes = 8;
    var step = 1 / (num_boxes + 1);
    for(var i = 1; i <= num_boxes; i++) {
        var proportion = 1 - (step * i);
        drawCenteredBox(context, canvasWidth, canvasHeight, proportion, proportionX, proportionY);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('header-canvas');
    var context = canvas.getContext('2d');
    var headsection = document.getElementsByClassName('section-head')[0];

    canvas.width = 400;
    canvas.height = 400;
    // canvas.style.width = canvas.width + "px";
    // canvas.style.height = canvas.height + "px";

    headsection.addEventListener('mousemove', function(e) {
        var childOffsetX = canvas.offsetLeft;
        var childOffsetY = canvas.offsetTop;
        var parentOffsetX = this.offsetLeft;
        var parentOffsetY = this.offsetTop;

        var centerX = childOffsetX + (canvas.width / 2)
        var centerY = childOffsetY + (canvas.height / 2)

        var x = e.clientX;
        var y = e.clientY;
        var relX = x - parentOffsetX;
        var relY = y - parentOffsetY;

        var centerDistanceX = x - centerX;
        var centerDistanceY = (y - centerY);

        if(centerDistanceX > 0) {
            var proportionX = centerDistanceX / (this.offsetWidth - centerX);
        }
        else {
            var proportionX = centerDistanceX / centerX;
        }
        if(centerDistanceY > 0) {
            var proportionY = centerDistanceY / (this.offsetHeight - centerY);
        }
        else {
            var proportionY = centerDistanceY / centerY;
        }

        drawBoxes(canvas, context, proportionX, proportionY);
    });

    drawBoxes(canvas, context, 0, 0);

    showContacts();
});
