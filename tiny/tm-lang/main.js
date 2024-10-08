// let app = document.getElementById('app');
// app.width = 1024;
// app.height = app.width / 1.77;
// let context = app.getContext("2d");

let programCode0 = `//--------------------------------------
//       /\\           /\\                                            
//      /  \\         /  \\                                            
//     /    \\       /    \\                                           
//    /      \\     /      \\                                          
//    ---  ---     ---  ---                                           
//      |  |         |  |                                             
//      |  |         |  |                                             
//      |  |         |  |                                             
//      |  |         |  |                                             
//      ----         ----                                             
//     
// Mysal programmlary ýakardaky spisokdan saýla
// Ýa-da göni barde ýazyp bilersin.
// Kod ýazan soň ýokardayky düwme bilen ýa-da Ctrl+Enter basyp işledip bolýar.
`;

let programCode1  = `// çapet - teksti ýa-da sany ekrana çap et
çapet "-------------------------";
çapet "Salam oglanlar we gyzlar!";
çapet 77;
çapet "Tekstleri" + " goşup" + " bolýar.";
çapet "Sanlary hem" + " goşup" + " bolýar.";
çapet 77 + 24; 
`;

let programCode2  = `// ÜÝTGEÝÄN
üýtgeýän a  = 4;
üýtgeýän b  = 5;
üýtgeýän ç  = a*a + b*b;
çapet "a*a + b*b = ";
çapet ç;
`;

let programCode3  = `// Eger,ýogsa,we,ýada,dogry,ýalan

üýtgeýän howaGowy = ýalan;
üýtgeýän aýlykAldym = dogry;

eger (aýlykAldym) {
    çapet "Bu günden lezzet alýan.";
} ýogsa {
    çapet "Işlemäge energiýa ýok.";
}

eger (aýlykAldym we !howaGowy) {
    çapet "Agşam kafe bararyn.";
}

eger (aýlykAldym we howaGowy) {
    çapet "Ertir pikginge bararyn.";
}

eger (!howaGowy ýada 2 + 2 == 4) {
    çapet "Howa gowy ýa-da erbet bolsada matematika hemişe işleýar.";
}
`;

let programCode4  = `// gaýtala, dowamly
üýtgeýän maksimumSapar  = 7;

çapet "--- gaýtala ------------------------------";

gaýtala (üýtgeýän i = 0; i < maksimumSapar; i = i + 1) {
    eger(i < 2) {
        çapet "Işleýän";
    } ýogsa {
        çapet "- ýadadym";
    }
}

çapet "--- dowamly ------------------------------";

üýtgeýän sapar = 0;
dowamly(sapar < maksimumSapar) {
    çapet sapar;
    // BELLIK: Kopeltmäge ýatdan çykarma. Ýogsa programmaň doňup gider.
    sapar = sapar + 1;
}
`;

let programCode5  = `// funksiýa, gaýtar, ýapylan funksiýalar

funksiýa kwadrat(san) {
    gaýtar san*san;
}

çapet "25 kwadrady = ";
çapet kwadrat(25);

çapet "-------------------------";
gaýtala (üýtgeýän i = 1; i < 11; i = i + 1) {
    çapet kwadrat(i);
}
çapet "-------------------------";

funksiýa goşFunksiýa(san1) {
    funksiýa goş(san2) {
        gaýtar san1 + san2;
    }
    gaýtar goş;
}

üýtgeýän ikiGoş  = goşFunksiýa(2);
üýtgeýän onGoş  = goşFunksiýa(10);

çapet ikiGoş(7);
çapet onGoş(7);`;

let programCode6  = `// ------------------------
// Haýwanlar barada programma (klas, başla, başlyk, bu, hiçzat)
// ------------------------

klas Haýwan  {
    funksiýa başla(at, sapar) {
        çapet "Men " + at;
        bu.gaýtalama_saparlary = sapar;
        bu.at = at;
    }

    funksiýa gürle(soz) {
        gaýtala (üýtgeýän i = 0; i < bu.gaýtalama_saparlary; i = i + 1) {
            eger(i < 2) {
                çapet soz;
            } ýogsa {
                çapet "-- ýadadym";
            }
        }
    }
}

klas Pişik : Haýwan {
    funksiýa başla(sapar) {
        başlyk.başla("Pişik", sapar);
    }

    funksiýa gürle() {
        başlyk.gürle("mýaw");
    }
}

klas It : Haýwan {
    funksiýa başla(sapar) {
        başlyk.başla("It", sapar);
    }

    funksiýa gürle() {
        başlyk.gürle("gaw gaw");
    }
}

üýtgeýän p  = Pişik(3);
p.gürle();

üýtgeýän it  = It(5);
it.gürle();
`;


let programList = [
    {name: 'Baş',  code: programCode0},
    {name: 'Çap etmek'   , code: programCode1} ,
    {name: 'Üýtgeýänler' , code: programCode2} ,
    {name: 'Ýagdaylar'   , code: programCode3} ,
    {name: 'Gaýtalamak'  , code: programCode4} ,
    {name: 'Funksiýalar' , code: programCode5} ,
    {name: 'Klaslar'     , code: programCode6} ,
];

let global_w = null;
let globalCodeInputId = "code-input";
let globalCodeOutputId = "computation-output";

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
    let buttonExecute = document.getElementById('do-execute');
    buttonExecute.addEventListener("click", () => {
        console.log('hi');
        compileAndExecute();
    });

    document.body.addEventListener('keydown', (event) => {
        if(event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            compileAndExecute();
        }
    });

    // function keyEvent(e, isDown) {
    //     if(e.key == "Escape") {
    //         w.instance.exports.ProcessEventKey(0, isDown);
    //     }
    // }

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
    //
    // function keyEvent(e, isDown) {
    //     if(e.key == "Escape") {
    //         w.instance.exports.ProcessEventKey(0, isDown);
    //     }
    // }
    //
    // window.addEventListener('keydown', function(e) {
    //     keyEvent(e, true);
    // });
    // window.addEventListener('keyup', function(e) {
    //     keyEvent(e, false);
    // });
}

function writeOutput(string) {
    let output = document.getElementById(globalCodeOutputId);
    output.innerHTML = output.innerHTML + `<p>${string}</p>`;
}

function LogString(stringPointer) {
    let s = w.instance.exports.getStringLength(stringPointer);
    let stringBytes = new Uint8ClampedArray(w.instance.exports.memory.buffer, stringPointer, s);
    let string = new TextDecoder().decode(stringBytes);
    writeOutput(string);
    // console.log(string);
}
function LogStringLimit(stringPointer, size) {
    let stringBytes = new Uint8ClampedArray(w.instance.exports.memory.buffer, stringPointer, size);
    let string = new TextDecoder().decode(stringBytes);
    writeOutput(`############: ${string}`);
    // console.log("############: ", string);
}

var globalCollector = '';
function CollectString(stringPointer, size) {
    let stringBytes = new Uint8ClampedArray(w.instance.exports.memory.buffer, stringPointer, size);
    let string = new TextDecoder().decode(stringBytes);
    globalCollector += string;
}
function CollectInt(value) {
    globalCollector += value.toString();
}
function CollectDoubleG(value) {
    globalCollector += value.toString();
}
function DumpColletion() {
    // console.log(globalCollector);
    writeOutput(globalCollector);
    globalCollector = '';
}


function strtod(stringPointer) {
    // TODO: @Refactor. @ErrorCheck
    let stringSize = 20;
    let stringBytes = new Uint8ClampedArray(w.instance.exports.memory.buffer, stringPointer, stringSize);
    let string = new TextDecoder().decode(stringBytes);
    let number = parseInt(string);
    return number;
}


function noop(...items) { }
const libm = {
    "LogInt": console.log,
    "LogString": LogString,
    "LogStringLimit": LogStringLimit,
    "LogD": console.log,
    "LogI": console.log,
    "LogU": console.log,
    "LogX": console.log,

    "CollectString": CollectString,
    "CollectInt": CollectInt,
    "CollectDoubleG": CollectDoubleG,
    "DumpColletion": DumpColletion,

    "strtod": strtod,

};



// let programCode = `
// gaýtala (üýtgeýän i = 0; i < 10; i = i + 1) {
//     eger(i < 2) {
//         çapet "aaa";
//     } ýogsa {
//         çapet "-- ýadadym";
//     }
// }
// `;

// let programCode = `
// gaýtala (üýtgeýän i = 0; i < 10; i = i + 1) {
//     çapet "aaa";
// }
// `;


// let programCode = `gaý`;
// let programCode = `abý`;
// let programCode = `abc;`;
// let programCode = 'üýtgeýän san = 5;';
// let programCode = 'klass Haywan {}';
// let programCode = 'üýtgeýän san;';
let programCode = 'çapet "Nadyan dostum";';


function arrayFromWasm(w, data) {
    const memory = w.instance.exports.memory;
    const loc = w.instance.exports.AllocateBytes(data.length);
    const array = new Uint8ClampedArray(memory.buffer, loc, data.length);
    array.set(data);
    return array;
}

function arrayFromWasmZeroTerminated(w, data) {
    data = data;
    const memory = w.instance.exports.memory;
    const loc = w.instance.exports.AllocateBytes(data.length + 1);
    const array = new Uint8ClampedArray(memory.buffer, loc, data.length + 1);
    array.set(data);
    return array;
}


function compileAndExecute() {
    let output = document.getElementById(globalCodeOutputId);
    output.innerHTML = '';

    let programRawText = document.getElementById(globalCodeInputId).value;

    sourceCodeBytes = new TextEncoder().encode(programRawText);

    let input = arrayFromWasmZeroTerminated(w, sourceCodeBytes);

    w.instance.exports.RunCodeString(input.byteOffset, input.length)

    if(globalCollector.length > 0) {
        DumpColletion();
    }
}

function setupProgramList() {
    let select = document.getElementById('program-list-select');
    let optionsList = [];
    // for(let programName in programList) {
    //     let option = document.createElement('option');
    //     option.value = programName;
    //     option.innerHTML = programName;
    //     select.appendChild(option);
    // }
    for(let program of programList) {
        let option = document.createElement('option');
        option.value = program.name;
        option.innerHTML = program.name;
        select.appendChild(option);
    }
    select.addEventListener('change', (e) => {
        let program = programList[select.selectedIndex];
        document.getElementById(globalCodeInputId).value = program.code;
        compileAndExecute();
        // console.log(select.selectedIndex);
    });


    // select.selectedIndex = 2;
    select.dispatchEvent(new Event('change'));

}

WebAssembly.instantiateStreaming(fetch('program.wasm'), {
    "env": makeEnvironment(libm),
}).then(w0 => {
    w = w0;
    global_w = w;

    setupProgramList();
    setupEvents(w);

    compileAndExecute();

});

// document.addEventListener("DOMContentLoaded", () => {
// });


