document.addEventListener("DOMContentLoaded", () => {
    let appCanvas = document.getElementById('app');
    appCanvas.width = 640;
    appCanvas.height = 480;
    let appContext = appCanvas.getContext("2d");

    const realWidth = 320;
    const realHeight = 240;


    let globalSounds = new Map();
    let globalScheduledSounds = new Map();
    let audioContext = null;

    async function loadSound(id, url) {
        // console.log(id, url);
        return new Promise((resolve, effect) => {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.addEventListener('canplaythrough', () => {
                globalSounds.set(id, audio);
                if(globalScheduledSounds.has(id)) {
                    let sound = globalScheduledSounds.get(id);
                    playSound(id, sound.volume, sound.isLooping)
                    globalScheduledSounds.delete(id);
                }
                resolve(audio);
            });
            audio.addEventListener('error', (e) => {
                reject(new Error(`Failed to load sound: ${url}`));
                scheduleSound(id, volume, isLooping);
            });
            audio.src = url;
            audio.load();
        });
    }

    function scheduleSound(index, volume, isLooping) {
        globalScheduledSounds.set(index, {
            'volume': volume,
            'isLooping': isLooping
        });
    }

    function playSound(index, volume, isLooping) {
        if(isLooping && !globalSounds.has(index)) {
            scheduleSound(index, volume, isLooping);
            return null;
        }

        if(!globalSounds.has(index)) {
            console.log(`Sound ${index} is not loaded yet`);
            return null;
        }

        if(globalScheduledSounds.has(index)) {
            globalScheduledSounds.delete(index);
        }

        const adjustedVolume = volume / 100;

        const audio = globalSounds.get(index).cloneNode();
        audio.volume = Math.max(0, Math.min(1, adjustedVolume));
        audio.loop = isLooping;

        audio.play().catch(error => {
            console.error('Playback failed:', error);
            scheduleSound(index, volume, isLooping);
        });
    }

    function LoadAllAssets() { console.log("LoadAllAssets"); }
    const libm = {
        "Cos": Math.cos,
        "Sin": Math.sin,
        "Abs": Math.abs,
        "Ceil": Math.ceil,
        "Floor": Math.floor,
        "LogInt": console.log,
        "LoadAllAssets": LoadAllAssets,
        "PlayAudio": playSound,
        "UniformRandom": Math.random,
        "GetAssets": getAssets,
        "GetAssetsSize": getAssetsSize,
        "GetPngSize": getPngSize,
        "DecompressPng": decompressPng,
    }
    function makeEnvironment(...envs) {
        return new Proxy(envs, {
            get(target, prop, reciever) {
                for(let env of envs) {
                    if(env.hasOwnProperty(prop)) {
                        return env[prop];
                    }
                }
                return (...args) => { console.error("Not Implemented: " + prop, args)}
            }
        });
    }

    let globalAssetsBytes = {};
    let globalWasmMemory = {};
    let wasm = {};

    async function preloadAssets(instance) {
        const loadPath = "packed.data";
        const response = await fetch(loadPath);
        if(!response.ok) {
            // TODO: Proper error processing
            console.log(`Couldn't load ${loadPath}`);
        }
        globalAssetsBytes = await response.bytes();
    }

    function getAssets(dataPtr, size) {
        const wasmBytes = new Uint8Array(globalWasmMemory.buffer);
        wasmBytes.set(globalAssetsBytes, dataPtr)
    }
    function getAssetsSize() {
        return globalAssetsBytes.length;
    }

    async function pngToUncompressedBytes(pngBytes) {
        const blob = new Blob([pngBytes], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        
        try {
            // Load image
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });
            
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const uncompressedBytes = new Uint8Array(imageData.data.buffer);
            
            URL.revokeObjectURL(url);
            
            return {
                bytes: uncompressedBytes,
                width: img.width,
                height: img.height,
                channels: 4 // RGBA
            };
            
        } catch (error) {
            URL.revokeObjectURL(url);
            throw error;
        }
    }

    // function getPngSize(pngBytes, size) {
    //     const x = globalWasmMemory.buffer.slice(pngBytes, pngBytes + size);
    //
    //     const view = new DataView(x);
    //     let offset = 0;
    //     
    //     if (view.getUint32(0) !== 0x89504E47 || view.getUint32(4) !== 0x0D0A1A0A) {
    //         throw new Error('Invalid PNG file');
    //     }
    //     
    //     offset += 8; // Skip signature
    //     
    //     let width = 0, height = 0, bitDepth = 0, colorType = 0;
    //     let idatData = [];
    //     
    //     while (offset < pngBytes.byteLength) {
    //         const length = view.getUint32(offset);
    //         offset += 4;
    //         
    //         const type = String.fromCharCode(
    //             view.getUint8(offset), view.getUint8(offset + 1),
    //             view.getUint8(offset + 2), view.getUint8(offset + 3)
    //         );
    //         offset += 4;
    //         
    //         if (type === 'IHDR') {
    //             console.log('-');
    //             width = view.getUint32(offset);
    //             height = view.getUint32(offset + 4);
    //             bitDepth = view.getUint8(offset + 8);
    //             colorType = view.getUint8(offset + 9);
    //             offset += length;
    //             break;
    //         }
    //         else if (type === 'IDAT') {
    //             // Collect IDAT chunks
    //             const chunkData = new Uint8Array(pngBytes, offset, length);
    //             idatData.push(chunkData);
    //             offset += length;
    //         } else {
    //             offset += length; // Skip other chunks
    //         }
    //         
    //         offset += 4; // Skip CRC
    //     }
    //
    //     console.log(width, height);
    //     
    // }


    function getPngSize(pngBytes, size) {
        const pngRawBytes = globalWasmMemory.buffer.slice(pngBytes, pngBytes + size);

        const view = new DataView(pngRawBytes);

        // Check PNG signature (first 8 bytes)
        if (view.getUint32(0) !== 0x89504E47 || view.getUint32(4) !== 0x0D0A1A0A) {
            throw new Error('Invalid PNG file signature');
        }

        // IHDR chunk starts at byte 8
        // Length: 4 bytes, Chunk type: 4 bytes, Data: 13 bytes, CRC: 4 bytes
        const chunkLength = view.getUint32(8);
        if (chunkLength !== 13) {
            throw new Error('Invalid IHDR chunk length');
        }

        // Check if it's actually IHDR chunk
        const chunkType = view.getUint32(12);
        if (chunkType !== 0x49484452) { // "IHDR" in ASCII
            throw new Error('IHDR chunk not found at expected position');
        }

        // Read dimensions from IHDR data
        const width = view.getUint32(16);
        const height = view.getUint32(20);
        const bitDepth = view.getUint8(24);
        const colorType = view.getUint8(25);

        const bytesPerColor = 4 * (bitDepth / 8); // 
        const pngTotalSize = bytesPerColor*width*height;

        // const packed = ((width & 0xff) << 16) | (height & 0xff);
        const packed = ((width & 0xffff) << 16) | (height & 0xffff);

        return packed;
    }

    let decompressCounter = 0;
    async function decompressPng(uncompressedBytesI, compresedBytesI, compressedSize) {
        decompressCounter++;
        const pngRawBytes = globalWasmMemory.buffer.slice(compresedBytesI, compresedBytesI + compressedSize);

        // Turn bytes into a blob and then into an image
        const blob = new Blob([pngRawBytes], { type: "image/png" });
        const img = new Image();
        img.src = URL.createObjectURL(blob);

        await img.decode(); // wait for image to load

        // Draw image on canvas
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get raw RGBA pixel data
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        const wasmBytes = new Uint8Array(globalWasmMemory.buffer);
        wasmBytes.set(imageData.data, uncompressedBytesI)

        // return {
        //     width: img.width,
        //     height: img.height,
        //     bytes: imageData.data, // Uint8ClampedArray, RGBA
        // };

        decompressCounter--;
        // console.log(decompressCounter);
    }

    async function waitUntil(condFn, interval = 50) {
      while (!condFn()) {
        await new Promise(r => setTimeout(r, interval));
      }
    }


    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = realWidth;
    tempCanvas.height = realHeight;
    const srcCtx = tempCanvas.getContext("2d");
    function scaleAndPutImage(destinationCanvas, imageData) {
        srcCtx.putImageData(imageData, 0, 0);

        appContext.imageSmoothingEnabled = false;  // or false for pixelated scaling

        // appContext.drawImage(tempCanvas, 
        //     0, 0, 
        //     destinationCanvas.width, destinationCanvas.height);

        appContext.drawImage(
            tempCanvas,
            0, 0, tempCanvas.width, tempCanvas.height,
            0, 0, appCanvas.width, appCanvas.height
        );


        return appContext.getImageData(0, 0, destinationCanvas.width, destinationCanvas.height);
    }

    async function startLoop() {
        const module = wasm.module;
        const instance = wasm.instance;

        instance.exports.Init();

        function loop(timestamp) {
            instance.exports.DoCycle();

            const buffer = instance.exports.memory.buffer;
            const pixels = instance.exports.GlobalPixels;
            const image = new ImageData(new Uint8ClampedArray(buffer, pixels, realWidth * realHeight * 4), realWidth );

            scaleAndPutImage(appCanvas, image)

            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(loop);
    }

    function keyEvent(keyCode, isDown) {
        checkAllScheduled();
        wasm.instance.exports.ProcessEventKey(keyCode, isDown);
    }
    function setupEvents(w, app) {
        // app.addEventListener('mousedown', function(e) {
        //     w.instance.exports.ProcessEventMouseClick(e.offsetX, e.offsetY, 1);
        // });
        //
        // app.addEventListener('mouseup', function(e) {
        //     w.instance.exports.ProcessEventMouseClick(e.offsetX, e.offsetY, 0);
        // });
        //
        // app.addEventListener('mousemove', function(e) {
        //     w.instance.exports.ProcessEventMouseMove(e.offsetX, e.offsetY);
        // });

        // function keyEvent(e, isDown) {

        window.addEventListener('keydown', function(e) {
            keyEvent(e.keyCode, true);
        });
        window.addEventListener('keyup', function(e) {
            keyEvent(e.keyCode, false);
        });
    }

    function g(addr) {
        const memory = wasm.instance.exports.memory;
        const view   = new DataView(memory.buffer);
        let value = view.getInt32(addr, true);
        return value;
    }

    function checkAllScheduled() {
        if(globalScheduledSounds.size > 0) {
            console.log(globalScheduledSounds.size);
            for(let [index, sound] of globalScheduledSounds) {
                playSound(index, sound.volume, sound.isLooping)
            }
        }
    }
    document.addEventListener('click', () => {
        checkAllScheduled();
    });

    WebAssembly.instantiateStreaming(fetch('webgame.wasm'), {
        'env': makeEnvironment(libm),
    }).then((result) => {
        wasm = result;
        const module = result.module;
        const instance = result.instance;
        globalWasmMemory = instance.exports.memory;

        setupEvents(wasm, appCanvas);

        loadSound(g(instance.exports.AudioBackground.value), "music.mp3");
        loadSound(g(instance.exports.AudioAmbience.value), "ambience.mp3");
        loadSound(g(instance.exports.AudioDash.value), "dash.mp3");
        loadSound(g(instance.exports.AudioHit.value), "hit.mp3");
        loadSound(g(instance.exports.AudioJump.value), "jump.mp3");
        loadSound(g(instance.exports.AudioShoot.value), "shoot.mp3");


        preloadAssets(instance).then(() => {
            startLoop();
        });

    });

    const WEBKEY_LEFT = 37;
    const WEBKEY_UP = 38;
    const WEBKEY_RIGHT = 39;
    const WEBKEY_DOWN = 40;
    const WEBKEY_X = 88;
    const WEBKEY_P = 80;

    function registerClick(element, keyCode) {
        element.addEventListener('mousedown', () => { keyEvent(keyCode, true); });
        element.addEventListener('mouseup', () => { keyEvent(keyCode, false); });
        element.addEventListener('touchstart', () => { keyEvent(keyCode, true); });
        element.addEventListener('touchend', () => { keyEvent(keyCode, false); });
    }

    registerClick(buttonX, WEBKEY_X);
    registerClick(buttonUp, WEBKEY_UP);
    registerClick(buttonLeft, WEBKEY_LEFT);
    registerClick(buttonRight, WEBKEY_RIGHT);
});
