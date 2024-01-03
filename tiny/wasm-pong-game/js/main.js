let app = document.getElementById('app');
app.width = 1024;
app.height = app.width / 1.77;
let context = app.getContext("2d");

function makeEnvironment(...envs) {
    return new Proxy(envs, {
        get(target, prop, reciever) {
            for(let env of envs) {
                if(env.hasOwnProperty(prop)) {
                    // return [prop];
                    return env[prop];
                }
            }
            return (...args) => { console.error("Not Implemented: " + prop, args)}
        }
    });
}


function setupEvents(w, app) {
    app.addEventListener('mousedown', function(e) {
        w.instance.exports.ProcessEventMouseClick(e.offsetX, e.offsetY, 1);
    });

    app.addEventListener('mouseup', function(e) {
        w.instance.exports.ProcessEventMouseClick(e.offsetX, e.offsetY, 0);
    });

    app.addEventListener('mousemove', function(e) {
        w.instance.exports.ProcessEventMouseMove(e.offsetX, e.offsetY);
    });

    function keyEvent(e, isDown) {
        if(e.key == "Escape") {
            w.instance.exports.ProcessEventKey(0, isDown);
        }
    }

    window.addEventListener('keydown', function(e) {
        keyEvent(e, true);
    });
    window.addEventListener('keyup', function(e) {
        keyEvent(e, false);
    });
}


function noop(...items) { }
const libm = {
    "cos": Math.cos,
    "sin": Math.sin,
    "round": Math.round,
    "fabs": Math.abs,
    "fmax": Math.max,
    "fmin": Math.min,
    "memset": noop,
    "memcpy": noop,
    "LogInt": console.log,
};


async function fetchAndInstantiate() {
    const response = await fetch("game.wasm");
    const buffer = await response.arrayBuffer();
    const obj = await WebAssembly.instantiate(buffer, {
        "env": makeEnvironment(libm),
    }).then(w0 => {
        w = w0;

        setupEvents(w, app);

        let prev = null;
        function first(timestamp) {
            w.instance.exports.Init();

            prev = timestamp;
            window.requestAnimationFrame(loop);
        }

        function loop(timestamp) {
            w.instance.exports.DoCycle();
            w.instance.exports.ClearEventsChangeStatus();

            const buffer = w.instance.exports.memory.buffer;
            const pixels = w.instance.exports.GlobalPixels;
            const image = new ImageData(new Uint8ClampedArray(buffer, pixels, app.width * app.height * 4), app.width);
            context.putImageData(image, 0, 0);

            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(first);
    });
}

// async function loadAndStart() {
//     await WebAssembly.instantiateStreaming(fetch('game.wasm'), {
//         "env": makeEnvironment(libm),
//     }).then(w0 => {
//         w = w0;
//
//         setupEvents(w, app);
//
//         let prev = null;
//         function first(timestamp) {
//             w.instance.exports.Init();
//
//             prev = timestamp;
//             window.requestAnimationFrame(loop);
//         }
//
//         function loop(timestamp) {
//             w.instance.exports.DoCycle();
//             w.instance.exports.ClearEventsChangeStatus();
//
//             const buffer = w.instance.exports.memory.buffer;
//             const pixels = w.instance.exports.GlobalPixels;
//             const image = new ImageData(new Uint8ClampedArray(buffer, pixels, app.width * app.height * 4), app.width);
//             context.putImageData(image, 0, 0);
//
//             window.requestAnimationFrame(loop);
//         }
//
//         window.requestAnimationFrame(first);
//     });
// }


fetchAndInstantiate();
