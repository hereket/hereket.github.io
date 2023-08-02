// NOTE: This code is not for production use. Just a quick scrap code to test idea.
// Not to be reused!

// TODO: If ever use this code start on packing this in a some state that either should be 
// passed around or ...

var globalBoxSize = 40;
var globalItemsPerRow = 12;
var globalDrawText = true;
var globalRowTopOffset = 0;
var globalRowsPerPage = 10;
var globalAlternate = false;
var globalLongLineFirst = false;

var globalShowLetterA = true;
var globalShowLetterC = true;
var globalShowLetterG = true;
var globalShowLetterT = true;


function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function drawChars(canvas, chars) {
    var context = canvas.getContext('2d');
    var width = canvas.width; 
    var height = canvas.height; 

    var maxColCount = globalItemsPerRow;
    var minColCount = maxColCount - 1;
    var rowCount = Math.ceil(chars.length / (minColCount + maxColCount)) * 2;

    if(globalItemsPerRow * globalBoxSize < width) {
        var size = globalBoxSize; 
    } else {
        var size = width / maxColCount; 
    }

    var minPad = (width - (minColCount * size)) / 2;
    var maxPad = (width - (maxColCount * size)) / 2;

    context.fillStyle = 'rgba(240,240,240,1)';
    context.fillRect(0, 0, width, height);

    if(globalRowTopOffset < 0) {
        globalRowTopOffset = 0;
    } else if(globalRowTopOffset > rowCount - 4) {
        globalRowTopOffset = rowCount - 4;
    }

    var globalRowsPerPage = Math.floor(height / size) + 1;
    var minRow = globalRowTopOffset;
    var maxRow = minRow + globalRowsPerPage;

    for(var rowIndex = minRow; rowIndex < maxRow; rowIndex++) {
        if(rowIndex > rowCount - 1) { continue; }
        var y = size * (rowIndex - minRow);

        colCount = maxColCount;
        pad = maxPad;

        if(globalAlternate) {
            if(globalLongLineFirst) {
                if(rowIndex % 2 != 0) {
                    colCount = minColCount;
                    pad = minPad;
                } else {
                    colCount = maxColCount;
                    pad = maxPad;
                }
            } else {
                if(rowIndex % 2 == 0) {
                    colCount = minColCount;
                    pad = minPad;
                } else {
                    colCount = maxColCount;
                    pad = maxPad;
                }
            }

        }

        var startOfRow = rowIndex * maxColCount;
        if(globalAlternate) {
            if(globalLongLineFirst) {
                var exraOnes = Math.floor(rowIndex / 2);
            } else {
                var exraOnes = Math.ceil(rowIndex / 2);
            }
            var startOfRow =  (rowIndex * maxColCount) - (exraOnes);
        }

        for(var colIndex = 0; colIndex < colCount; colIndex++) {
            var x = pad + size * colIndex;
            var index = startOfRow + colIndex;


            var singleChar = chars[index];

            if(singleChar) {
                singleChar = singleChar.toLowerCase();
                var show = false;
                if     (singleChar == "a") { color = "#fdfaa9"; show = globalShowLetterA;} 
                else if(singleChar == "c") { color = "#8bea8f"; show = globalShowLetterC;} 
                else if(singleChar == "g") { color = "#74bfec"; show = globalShowLetterG;}
                else if(singleChar == "t") { color = "#ffbcc5"; show = globalShowLetterT;} 

                else if(singleChar == "f") { color = "#7fff00"; show = true} 
                else if(singleChar == "k") { color = "#FF7F50"; show = true} 
                else if(singleChar == "m") { color = "#fff700"; show = true} 
                else if(singleChar == "p") { color = "#ff4500"; show = true} 
                else if(singleChar == "r") { color = "#40e0d0"; show = true} 
                else if(singleChar == "n") { color = "#e0b0ff"; show = true} 
                else { color = "black"; show=true}

                if(show) {
                    context.fillStyle = color;
                    context.fillRect(x, y, size, size);
                } else {
                    context.fillStyle = "white";
                    context.fillRect(x, y, size, size);
                }

                if(globalDrawText) {
                    if(singleChar && show) {
                        // context.fillStyle = "rgba(255,255,255, 0.8)";
                        context.fillStyle = "rgba(0,0,0, 0.3)";
                        var fontsize = size;
                        context.font = fontsize + "px Arial";
                        context.fillText(singleChar.toUpperCase(), x, y + size);
                        // context.fillText(singleChar, x, y + size);
                    }
                }
            }
        }

        context.fillStyle = "rgba(0,0,0, 0.9)";
        var rowNum = rowIndex + 1 ; 
        context.font = 10 + "px Arial";
        context.fillText(rowNum.toString(), 0, y + size);
    }

}

function changeSize(diff, maxSize) {
    return function()
    {
        var sizeInput = document.getElementById("sizeValueInput");

        globalItemsPerRow += diff;
        if(globalItemsPerRow <= 0) { globalItemsPerRow = 1; } 
        // if(globalItemsPerRow > maxSize) { globalItemsPerRow = maxSize; } 
        // if(globalItemsPerRow > 50) { globalItemsPerRow = 50; } 

        sizeInput.value = globalItemsPerRow;

        update();
    }
}

// function toggleAndUpdate(statusVariable) {
//     return function() {
//         if(this.checked) { globalDrawText = true; } 
//         else             { globalDrawText = false; }
//         update();
//     }
// }

function update() {
    var canvas_node = document.getElementById('dnacanvas');
    var input_node  = document.getElementById('dnainput');

    var canvasWidth = canvas_node.offsetWidth;
    var canvasHeight = canvas_node.offsetHeight;

    var chars = input_node.value.split('');
    drawChars(canvas_node, chars)
}


document.addEventListener("DOMContentLoaded", function() {
    // TODO: This needs a hug refactoring

    var canvas_node = document.getElementById('dnacanvas');
    var input_node  = document.getElementById('dnainput');

    console.log(canvas_node.offsetTop);
    canvas_node.width = 200;

    var canvasWidth = canvas_node.offsetWidth;
    var canvasHeight = canvas_node.offsetHeight;
    canvas_node.width = canvasWidth;
    canvas_node.height = canvasHeight;

    var chars = input_node.value.split('');
    drawChars(canvas_node, chars)

    input_node.addEventListener("input", function(){
        var chars = input_node.value.split('');
        drawChars(canvas_node, chars)
    });

    window.addEventListener('resize', function(e) {
        canvas_node.width = canvas_node.offsetWidth;
        canvas_node.height = canvas_node.offsetHeight;

        drawChars(canvas_node, chars)
    }, true);


    var sizeIncrease = document.getElementById("sizeIncreaseButton");
    var sizeDecrease = document.getElementById("sizeDecreaseButton");
    var sizeInput = document.getElementById("sizeValueInput");

    sizeIncrease.addEventListener("click", changeSize( 1, canvasWidth));
    sizeDecrease.addEventListener("click", changeSize(-1, canvasWidth));
    sizeInput.value = globalItemsPerRow;
    sizeInput.addEventListener("input", function(){
        var value = parseInt(this.value);
        if(value) {
            globalItemsPerRow = value;
            update();
        }
    });


    var showLetters = document.getElementById("showLetters");
    var showBoxA = document.getElementById("showBoxA");
    var showBoxC = document.getElementById("showBoxC");
    var showBoxT = document.getElementById("showBoxT");
    var showBoxG = document.getElementById("showBoxG");
    showLetters.addEventListener("change", function() {
        if(this.checked) { globalDrawText = true; } 
        else             { globalDrawText = false; }
        update();
    });
    showBoxA.addEventListener("change", function() {
        if(this.checked) { globalShowLetterA = true; } 
        else             { globalShowLetterA = false; }
        update();
    });
    showBoxC.addEventListener("change", function() {
        if(this.checked) { globalShowLetterC = true; } 
        else             { globalShowLetterC = false; }
        update();
    });
    showBoxT.addEventListener("change", function() {
        if(this.checked) { globalShowLetterT = true; } 
        else             { globalShowLetterT = false; }
        update();
    });
    showBoxG.addEventListener("change", function() {
        if(this.checked) { globalShowLetterG = true; } 
        else             { globalShowLetterG = false; }
        update();
    });



    var alternateRows = document.getElementById("alternateRows");
    var longLineFirst = document.getElementById("longLineFirst");
    alternateRows.addEventListener("change", function(e) {
        if(this.checked) {
            globalAlternate = true; 
            // longLineFirst.parentNode.style.display = "flex";
            longLineFirst.parentNode.classList.remove("hidden");
        } 
        else{
            globalAlternate = false; 
            // longLineFirst.parentNode.style.display = "none";
            longLineFirst.parentNode.classList.add("hidden");
        }
        update();
    });

    longLineFirst.addEventListener("change", function(e) {
        if(this.checked) { globalLongLineFirst = true; } 
        else             { globalLongLineFirst = false; }
        update();
    });

    function moveRowLine(amount) {
        return function() {
            globalRowTopOffset += amount;
            update();
        }
    }
    
    function moveRowPage(type) {
        return function() {
            if(type == "up") {
                globalRowTopOffset += globalRowsPerPage;
            } else if (type == "down"){
                globalRowTopOffset -= globalRowsPerPage;
            }
            update();
        }
    }

    var buttonUp = document.getElementById("button-up");
    var buttonDown = document.getElementById("button-down");
    var buttonPageUp = document.getElementById("button-pageup");
    var buttonPageDown = document.getElementById("button-pagedown");
    var buttonTop = document.getElementById("button-top");

    var sequence_input = document.getElementById("sequence-input");
    var sequence_show = document.getElementById("sequence-show");
    var sequence_close = document.getElementById("sequence-close");
    sequence_close.addEventListener("click", function() {
        sequence_input.classList.add("sequence-removed");
        sequence_show.classList.remove("show-button-removed");
    });

    sequence_show.addEventListener("click", function() {
        sequence_input.classList.remove("sequence-removed");
        sequence_show.classList.add("show-button-removed");

    });

    buttonUp.addEventListener("click", moveRowLine(1));
    buttonDown.addEventListener("click", moveRowLine(-1));
    buttonPageUp.addEventListener("click", moveRowPage("up"));
    buttonPageDown.addEventListener("click", moveRowPage("down"));
    buttonTop.addEventListener("click", function() {
        globalRowTopOffset = 0;
        update();
    });
});
