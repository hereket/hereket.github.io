let programCode0="//--------------------------------------\n//       /\\           /\\                                            \n//      /  \\         /  \\                                            \n//     /    \\       /    \\                                           \n//    /      \\     /      \\                                          \n//    ---  ---     ---  ---                                           \n//      |  |         |  |                                             \n//      |  |         |  |                                             \n//      |  |         |  |                                             \n//      |  |         |  |                                             \n//      ----         ----                                             \n//     \n// Mysal programmlary ýakardaky spisokdan saýla\n// Ýa-da göni barde ýazyp bilersin.\n// Kod ýazan soň ýokardayky düwme bilen ýa-da Ctrl+Enter basyp işledip bolýar.\n",programCode1='// çapet - teksti ýa-da sany ekrana çap et\nçapet "-------------------------";\nçapet "Salam oglanlar we gyzlar!";\nçapet 77;\nçapet "Tekstleri" + " goşup" + " bolýar.";\nçapet "Sanlary hem" + " goşup" + " bolýar.";\nçapet 77 + 24; \n',programCode2='// ÜÝTGEÝÄN\nüýtgeýän a  = 4;\nüýtgeýän b  = 5;\nüýtgeýän ç  = a*a + b*b;\nçapet "a*a + b*b = ";\nçapet ç;\n',programCode3='// Eger,ýogsa,we,ýada,dogry,ýalan\n\nüýtgeýän howaGowy = ýalan;\nüýtgeýän aýlykAldym = dogry;\n\neger (aýlykAldym) {\n    çapet "Bu günden lezzet alýan.";\n} ýogsa {\n    çapet "Işlemäge energiýa ýok.";\n}\n\neger (aýlykAldym we !howaGowy) {\n    çapet "Agşam kafe bararyn.";\n}\n\neger (aýlykAldym we howaGowy) {\n    çapet "Ertir pikginge bararyn.";\n}\n\neger (!howaGowy ýada 2 + 2 == 4) {\n    çapet "Howa gowy ýa-da erbet bolsada matematika hemişe işleýar.";\n}\n',programCode4='// gaýtala, dowamly\nüýtgeýän maksimumSapar  = 7;\n\nçapet "--- gaýtala ------------------------------";\n\ngaýtala (üýtgeýän i = 0; i < maksimumSapar; i = i + 1) {\n    eger(i < 2) {\n        çapet "Işleýän";\n    } ýogsa {\n        çapet "- ýadadym";\n    }\n}\n\nçapet "--- dowamly ------------------------------";\n\nüýtgeýän sapar = 0;\ndowamly(sapar < maksimumSapar) {\n    çapet sapar;\n    // BELLIK: Kopeltmäge ýatdan çykarma. Ýogsa programmaň doňup gider.\n    sapar = sapar + 1;\n}\n',programCode5='// funksiýa, gaýtar, ýapylan funksiýalar\n\nfunksiýa kwadrat(san) {\n    gaýtar san*san;\n}\n\nçapet "25 kwadrady = ";\nçapet kwadrat(25);\n\nçapet "-------------------------";\ngaýtala (üýtgeýän i = 1; i < 11; i = i + 1) {\n    çapet kwadrat(i);\n}\nçapet "-------------------------";\n\nfunksiýa goşFunksiýa(san1) {\n    funksiýa goş(san2) {\n        gaýtar san1 + san2;\n    }\n    gaýtar goş;\n}\n\nüýtgeýän ikiGoş  = goşFunksiýa(2);\nüýtgeýän onGoş  = goşFunksiýa(10);\n\nçapet ikiGoş(7);\nçapet onGoş(7);',programCode6='// ------------------------\n// Haýwanlar barada programma (klas, başla, başlyk, bu, hiçzat)\n// ------------------------\n\nklas Haýwan  {\n    funksiýa başla(at, sapar) {\n        çapet "Men " + at;\n        bu.gaýtalama_saparlary = sapar;\n        bu.at = at;\n    }\n\n    funksiýa gürle(soz) {\n        gaýtala (üýtgeýän i = 0; i < bu.gaýtalama_saparlary; i = i + 1) {\n            eger(i < 2) {\n                çapet soz;\n            } ýogsa {\n                çapet "-- ýadadym";\n            }\n        }\n    }\n}\n\nklas Pişik : Haýwan {\n    funksiýa başla(sapar) {\n        başlyk.başla("Pişik", sapar);\n    }\n\n    funksiýa gürle() {\n        başlyk.gürle("mýaw");\n    }\n}\n\nklas It : Haýwan {\n    funksiýa başla(sapar) {\n        başlyk.başla("It", sapar);\n    }\n\n    funksiýa gürle() {\n        başlyk.gürle("gaw gaw");\n    }\n}\n\nüýtgeýän p  = Pişik(3);\np.gürle();\n\nüýtgeýän it  = It(5);\nit.gürle();\n',programList=[{name:"Baş",code:programCode0},{name:"Çap etmek",code:programCode1},{name:"Üýtgeýänler",code:programCode2},{name:"Ýagdaylar",code:programCode3},{name:"Gaýtalamak",code:programCode4},{name:"Funksiýalar",code:programCode5},{name:"Klaslar",code:programCode6}],global_w=null,globalCodeInputId="code-input",globalCodeOutputId="computation-output";function makeEnvironment(...e){return new Proxy(e,{get(n,a,t){for(let n of e)if(n.hasOwnProperty(a))return n[a];return(...e)=>{console.error("Not Implemented: "+a,e)}}})}function setupEvents(e,n){document.getElementById("do-execute").addEventListener("click",(()=>{console.log("hi"),compileAndExecute()})),document.body.addEventListener("keydown",(e=>{"Enter"===e.key&&(e.metaKey||e.ctrlKey)&&compileAndExecute()}))}function writeOutput(e){let n=document.getElementById(globalCodeOutputId);n.innerHTML=n.innerHTML+`<p>${e}</p>`}function LogString(e){let n=w.instance.exports.getStringLength(e),a=new Uint8ClampedArray(w.instance.exports.memory.buffer,e,n);writeOutput((new TextDecoder).decode(a))}function LogStringLimit(e,n){let a=new Uint8ClampedArray(w.instance.exports.memory.buffer,e,n);writeOutput(`############: ${(new TextDecoder).decode(a)}`)}var globalCollector="";function CollectString(e,n){let a=new Uint8ClampedArray(w.instance.exports.memory.buffer,e,n),t=(new TextDecoder).decode(a);globalCollector+=t}function CollectInt(e){globalCollector+=e.toString()}function CollectDoubleG(e){globalCollector+=e.toString()}function DumpColletion(){writeOutput(globalCollector),globalCollector=""}function strtod(e){let n=new Uint8ClampedArray(w.instance.exports.memory.buffer,e,20),a=(new TextDecoder).decode(n);return parseInt(a)}function noop(...e){}const libm={LogInt:console.log,LogString:LogString,LogStringLimit:LogStringLimit,LogD:console.log,LogI:console.log,LogU:console.log,LogX:console.log,CollectString:CollectString,CollectInt:CollectInt,CollectDoubleG:CollectDoubleG,DumpColletion:DumpColletion,strtod:strtod};let programCode='çapet "Nadyan dostum";';function arrayFromWasm(e,n){const a=e.instance.exports.memory,t=e.instance.exports.AllocateBytes(n.length),o=new Uint8ClampedArray(a.buffer,t,n.length);return o.set(n),o}function arrayFromWasmZeroTerminated(e,n){const a=e.instance.exports.memory,t=e.instance.exports.AllocateBytes(n.length+1),o=new Uint8ClampedArray(a.buffer,t,n.length+1);return o.set(n),o}function compileAndExecute(){document.getElementById(globalCodeOutputId).innerHTML="";let e=document.getElementById(globalCodeInputId).value;sourceCodeBytes=(new TextEncoder).encode(e);let n=arrayFromWasmZeroTerminated(w,sourceCodeBytes);w.instance.exports.RunCodeString(n.byteOffset,n.length),globalCollector.length>0&&DumpColletion()}function setupProgramList(){let e=document.getElementById("program-list-select");for(let n of programList){let a=document.createElement("option");a.value=n.name,a.innerHTML=n.name,e.appendChild(a)}e.addEventListener("change",(n=>{let a=programList[e.selectedIndex];document.getElementById(globalCodeInputId).value=a.code,compileAndExecute()})),e.dispatchEvent(new Event("change"))}WebAssembly.instantiateStreaming(fetch("program.wasm"),{env:makeEnvironment(libm)}).then((e=>{w=e,global_w=w,setupProgramList(),setupEvents(w),compileAndExecute()}));
