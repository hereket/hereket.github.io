

function WIteration(index, it) {
    return Div(
        {'classes': 'single-iteration'},
        Div('iteration # ' + (index + 1).toString(), {'classes': 'subtitle'}),
        Div(
            {'classes': 'row'},
            WBlockedBytes('left', it.leftPart, BYTE_STYLE_DATA),
            Div({'classes': 'w-pad'}),
            Div(
                WBlockedBytes('right', it.rightPart, BYTE_STYLE_DATA),
                WRepeatChar('↓', 4),
                sampleTable('Expansion table', 6, 8),
                WRepeatChar('↓', 6),
                WBlockedBytes('expanded', it.expandedValue, BYTE_STYLE_DATA),
                WRepeatChar('⊕', 6),
                WBlockedBytes('key #' + (index+1), it.key, BYTE_STYLE_KEY),
                WRepeatChar('↓', 6),
                WBlockedBytes('xored expaned value', it.xoredExpandedValue, BYTE_STYLE_DATA),
                WRepeatChar('↓', 6),
                Div('SFunction'),
                WRepeatChar('↓', 4),
                WBlockedBytes('SFunction result', it.SResult, BYTE_STYLE_DATA),
                WRepeatChar('↓', 4),
                sampleTable('PTable', 4, 8),
                WRepeatChar('↓', 4),
                WBlockedBytes('SFunction result permuted', it.SResultPermuted, BYTE_STYLE_DATA),
                WBlockedBytes('xor with left', it.SResultPermutedXored, BYTE_STYLE_DATA),
            ),
        ),
    );
}


function WBlockedText(text) {
    let result = []
    for(let c of text) {
        let w = Div(c, {'classes': 'item byte-bg-data'});
        result.push(w, );
    }
    return Div(
        {'classes': 'text-byte-block'},
        Div(
            {'classes': 'block'},
            result,
        ),
    );
}

const BYTE_STYLE_DATA = 1;
const BYTE_STYLE_CONST = 2;
const BYTE_STYLE_INITVECTOR = 3;
const BYTE_STYLE_KEY = 4;
function getCellStyle(byteBgStyle) {
    let bgClass = 'byte-bg-general';
    switch(byteBgStyle) {
        case BYTE_STYLE_DATA:       { bgClass = 'byte-bg-data';} break;
        case BYTE_STYLE_CONST:      { bgClass = 'byte-bg-static';} break;
        case BYTE_STYLE_INITVECTOR: { bgClass = 'byte-bg-initvector';} break;
        case BYTE_STYLE_KEY:        { bgClass = 'byte-bg-key';} break;
    }
    return bgClass;
}

function WBlockedBytes(name, bytes, byteBgStyle) {
    let result = []
    let bgClass = getCellStyle(byteBgStyle)
    for(let b of bytes) {
        let c = b.toString(16);
        if(c.length == 1) { c = '0' + c; }
        let w = Div(c, {'classes': `item s ${bgClass}`});
        result.push(w);
    }
    return Div(
        {'classes': 'text-byte-block'},
        Div(name, {'classes': 'name'}),
        Div(
            {'classes': 'block'},
            result,
        ),
    );
}

function WBlockWidthBytes(name, bytes, width, processed, byteBgStyle) {
    let result = []
    let rowCount = Math.floor(bytes.length / width);
    let rows = [];
    for(let y = 0; y < rowCount; y++) {
        let row = [];
        // for(let b of bytes) {
        for(let x = 0; x < width; x++) {
            let b = bytes[y*width + x];
            let c = b.toString(10);
            if(c.length == 1) { c = '0' + c; }
            let w = Div(c, {'classes': 'item s byte-bg-static'});
            row.push(w);
            // result.push(w);
        }
        rows.push( Div(
            {'classes': 'row'},
            row,
            Div({'classes': 'w-pad'}),
            Div('→'),
            Div({'classes': 'w-pad'}),
            WBlockedBytes('', [processed[y]], byteBgStyle),
        ));
    }

    return Div(
        {'classes': 'text-byte-block'},
        Div(name, {'classes': 'name'}),
        Div(
            // {'classes': 'block'},
            rows,
        ),
    );
}

function WBlockTable(name, bytes, width, byteBgStyle) {
    let result = []
    let rowCount = Math.floor(bytes.length / width);
    let rows = [];
    let bgClass = getCellStyle(byteBgStyle)
    for(let y = 0; y < rowCount; y++) {
        let row = [];
        // for(let b of bytes) {
        for(let x = 0; x < width; x++) {
            let b = bytes[y*width + x];
            let c = b.toString(10);
            if(c.length == 1) { c = '0' + c; }
            let w = Div(c, {'classes': `item s ${bgClass}`});
            row.push(w);
            // result.push(w);
        }
        rows.push( Div(
            {'classes': 'row'},
            row,
            Div({'classes': 'w-pad'}),
            // Div('→'),
            // Div({'classes': 'w-pad'}),
            // WBlockedBytes('', [processed[y]]),
        ));
    }

    return Div(
        {'classes': 'text-byte-block'},
        Div(name, {'classes': 'name'}),
        Div(
            {'classes': 'sbox-block'},
            rows,
        ),
    );
}

function WRepeatChar(character, count) {
    let items = [];
    for(let i = 0; i < count; i++) {
        items.push(Div(character, {'classes': 'item'}));
    }
    return Div(
        {'classes': 'char-block'},
        items
    );
}

function sampleTable(name, width, height) {
    let rows = [];
    for(let y = 0; y < height; y++) {
        let row = [];
        for(let x = 0; x < width; x++) {
            let item = Div({'classes': 'cell'});
            row.push(item)
        }
        rows.push(Div({'classes': 'row'}, row));
    }
    return Div(
        {'classes': 'sample-table text-byte-block'},
        Div(name, {'classes': 'name'}),
        rows,
    );
}

function generalPage(state) {
    let allInputBytes = new Uint8Array(state.blocks.length * 8);
    for(let i = 0; i < state.blocks.length; i++) {
        allInputBytes.set(state.blocks[i].inputBytes, i*8);
    }

    let cols = [];
    // for(let block of state.blocks) {
    for(let i = 0; i < state.blocks.length; i++) {
        let block = state.blocks[i];
        // let block = state.blocks[0];
        let iterations = [];
        for(let i = 0; i < block.iterations.length; i++) {
            let iteration = block.iterations[i];
            let v = WIteration(i, iteration);
            iterations.push(v);
        }
        let w = Div(
            {'classes': 'action-cols'},
            Div(`Block ${i + 1}`, {'classes': 'title'}),
            Div(
                {'classes': 'single-action-block'},
                WBlockedBytes('input bytes', block.inputBytes, BYTE_STYLE_DATA),
                WRepeatChar('⊕', 8),
                WBlockedBytes('Initialization Vector', block.initVector, BYTE_STYLE_INITVECTOR),
                WRepeatChar('↓', 8),
                WBlockedBytes('xor result', block.xoredInput, BYTE_STYLE_DATA),
            ),

            Div(
                {'classes': 'single-action-block'},
                WRepeatChar('↓', 8),
                sampleTable('Initial permutaion table', 8, 8),
                WRepeatChar('↓', 8),
                WBlockedBytes('initial permute', block.permutedXoredInput, BYTE_STYLE_DATA),
            ),

            Div('Split', {'attrs': {'style': 'text-align: center;'}}),
            Div(
                {'classes': 'row', 'attrs': {'style': 'justify-content: space-around'}},
                Div('↓'),
                Div('↓'),
            ),
            
            Div(iterations),

            Div(
                {'classes': 'single-action-block'},
                Div(
                    {'classes': 'row'},
                    WBlockedBytes('final left', block.finalLeft, BYTE_STYLE_DATA),
                    Div({'classes': 'w-pad'}),
                    WBlockedBytes('final right', block.finalRight, BYTE_STYLE_DATA),
                ),
            ),

            Div(
                {'classes': 'single-action-block'},
                WRepeatChar('↓', 8),
                WBlockedBytes('right + left', block.preOutputBlock, BYTE_STYLE_DATA),

                WRepeatChar('↓', 8),
                sampleTable('Inverse initial permutation table', 8, 8),
                WRepeatChar('↓', 8),

                WBlockedBytes('Final result', block.result, BYTE_STYLE_DATA),
            ),
        );
        cols.push(w);
    }

    function compressHeight() {
        let container = document.querySelector('.action-cols-container');
        container.classList.toggle('compress');
    }

    let output = Div(
        H3('Input', {'classes': 'block-title'}),
        Div(
            {'classes': 'allow-x-scoll'},
            WBlockedText(state.inputText),
            WBlockedBytes('input bytes', allInputBytes, BYTE_STYLE_DATA),
        ),

        H3('Output/Result', {'classes': 'block-title'}),
        Div(
            {'classes': 'allow-x-scoll'},
            WBlockedBytes('Output', state.result, BYTE_STYLE_DATA),
        ),

        Div(
            {'classes': 'row block-spaced'},
            H3('Process', {'classes': 'block-title'},),
            Div('Toggle height', {'events': {'click': compressHeight }}, {'classes': 'compress-height-toggle'}),
        ),
        Div(
            // {'classes': 'row action-cols-container'},
            {'classes': 'action-cols-container'},
            cols,
        ),

    );

    return output;
}

function keysPage(state) {
    let log = state.keyCalculationLog;

    let steps = [];
    // for(let s of log.steps) {
    for(let i = 0; i < log.steps.length; i++) {
        let stepIndex = i + 1;
        let s = log.steps[i];
        let bitHalfLenfth = s.bits.length/2;
        let bits = s.bits.slice(0, bitHalfLenfth) + " " + s.bits.slice(bitHalfLenfth);
        // let w = Div(
        //     {'classes': 'key-gen-block'},
        //     Div(
        //         {'classes': 'row'},
        //         WBlockedBytes('start data', s.blockStart),
        //         Div({'classes': 'w-pad'}),
        //         WBlockedBytes('Shifted << ' + s.shiftAmount, s.blockShifted),
        //         Div({'classes': 'w-pad'}),
        //         Div(bits),
        //         WBlockedBytes('aaaa', s.result),
        //     ),
        // );
        let w = Div(
            {'classes': 'key-gen-block'},
            Div(
                Div(
                    {'classes': 'title'},
                    "Key #" + stepIndex + " generation",
                ),
                WBlockedBytes('start data', s.blockStart, BYTE_STYLE_KEY),
                WRepeatChar('↓', 7),
                Div("Shift each half << " + s.shiftAmount, {'classes': 'small'}),
                WRepeatChar('↓', 7),
                WBlockedBytes('Shifted << ' + s.shiftAmount, s.blockShifted, BYTE_STYLE_KEY),
                WRepeatChar('↓', 7),
                sampleTable('Initial permutaion', 7, 8),
                WRepeatChar('↓', 6),
                WBlockedBytes('Generated key #' + stepIndex, s.result, BYTE_STYLE_KEY),
            ),
            
        );
        steps.push(w);
        if(i < log.steps.length - 1) {
            steps.push(Div(
                {'classes': 'key-connector'}
            ));
        }
    }

    return Div(
        H2('Key generation process'),
        WBlockedBytes('User provided key', log.start, BYTE_STYLE_KEY),
        WRepeatChar('↓', 8),
        sampleTable('Initial permutaion: PC1', 8, 8),
        WRepeatChar('↓', 7),
        WBlockedBytes('Permuted', log.initialPermutation, BYTE_STYLE_KEY),

        Div('Steps'),
        Div(
            {'classes': 'row'},
            steps,
        ),
    );
}

// function WBytesAsBits(bytes) {
//     let result = "";
//     let bitsCollection = [];
//     for(let b of bytes) {
//         let bits = toBits([b]);
//         bitsCollection.push(bits);
//     }
//
//     let joined = bitsCollection.join('_');
//
//     return Div(joined);
// }

function WBytesAsBits(bytes) {
    let result = "";
    let bitsCollection = [];
    let index = 1;
    function byteWidget(byte) {
        let bitsString = toBits([byte]);
        let bitsRow = [];
        for(let bit of bitsString) {
            bitsRow.push(
                Div(
                    {'classes': 'item'},
                    Div(index.toString(), {'classes': 'index'}),
                    Div(bit, {'classes': 'bit'}),
                )
            );
            index += 1;
        }
        // return Div(bitsString);
        return Div(
            {'classes': 'bytes-bits'},
            bitsRow
        );
    }
    for(let b of bytes) {
        let bits = toBits([b]);
        bitsCollection.push(byteWidget(b));
    }

    // let joined = bitsCollection.join('_');

    return Div(
        {'classes': 'row bits-row'},
        bitsCollection
    );
}

function WSboxBits(bytes, steps) {
    let result = "";
    let bitsCollection = [];
    let index = 1;

    function sblockWidget(stepIndex, bitsString) {
        // let bitsString = toBits([byte]);
        let bitsRow = [];
        // for(let bit of bitsString) {
        for(let i = 0; i < bitsString.length; i++) {
            let bit = bitsString[i];
            let bitClasses = 'bit sbox-x-bg';
            if(i == 0 || i == 5) {
                bitClasses = 'bit sbox-y-bg';
            }
            bitsRow.push(
                Div(
                    {'classes': 'item'},
                    Div(index.toString(), {'classes': 'index'}),
                    Div(bit, {'classes': bitClasses}),
                )
            );
            index += 1;
        }
        // return Div(bitsString);
        let step = steps[stepIndex];
        return Div(
            {'classes': 'sbox-bits'},
            bitsRow,
            Div('↓↓↓↓↓↓'),
            Div(
                {'classes': 'sbox-calc-part'},
                Div(`Sbox${stepIndex+1}`,  {'classes': 'title'}),
                Div(
                    {'classes': 'row'},
                    Div(`x: ${step.x}`, {'classes': 'sbox-x-bg'}),
                    Div(', '),
                    Div(`y: ${step.y}`, {'classes': 'sbox-y-bg'}),
                ),
                Div('='),
                Div(`${step.value.toString(16)}`, {'classes': 'result-half-byte'}),
            ),
            // Div(`${step.x}, ${step.y}`)
        );
    }
    let blockSizeInBits = 6;
    let allBits = toBits(bytes)
    let blockCount = Math.floor(allBits.length / blockSizeInBits);
    for(let i = 0; i < blockCount; i++) {
        let bits = allBits.slice(i*blockSizeInBits, i*blockSizeInBits + blockSizeInBits);
        bitsCollection.push(sblockWidget(i, bits));
    }

    return Div(
        {'classes': 'row'},
        bitsCollection
    );
}

function permutationsPage(state) {
    let block = state.blocks[0];
    let iter1 = state.blocks[0].iterations[0];
    let log = state.keyCalculationLog;
    let keyStep1 = log.steps[0];


    return Div(
        H3('Permutations', {'classes': 'block-title'}),

        Div(
            {'classes': 'row'},
        Div(
            H4('Initial Permutation of a block', {'classes': 'subtitle'}),
            {'classes': 'single-permutation-block'},
            WBlockedBytes('Block[0] xored input', block.xoredInput, BYTE_STYLE_DATA),
            Div(WBytesAsBits(block.xoredInput)),
            WRepeatChar('↓', 8),
            WBlockWidthBytes('Initial Permutation table', initialPermutationTable, 8, block.permutedXoredInput, BYTE_STYLE_DATA),
            WRepeatChar('↓', 8),
            Div(WBytesAsBits(block.permutedXoredInput)),
            WBlockedBytes('Result', block.permutedXoredInput, BYTE_STYLE_DATA),
        ),

        Div(
            H4('PC1', {'classes': 'subtitle'}),
            {'classes': 'single-permutation-block'},
            WBlockedBytes('User provided key bytes', log.start, BYTE_STYLE_KEY),
            Div(WBytesAsBits(log.start)),
            WRepeatChar('↓', 8),
            WBlockWidthBytes('PC1 Permutation table', PC1, 8, log.initialPermutation, BYTE_STYLE_KEY),
            WRepeatChar('↓', 7),
            Div(WBytesAsBits(log.initialPermutation)),
            WBlockedBytes('Result', log.initialPermutation, BYTE_STYLE_KEY),
        ),

        Div(
            H4('PC2', {'classes': 'subtitle'}),
            {'classes': 'single-permutation-block'},
            WBlockedBytes('Shifted value in step 1', keyStep1.blockShifted, BYTE_STYLE_KEY),
            Div(WBytesAsBits(keyStep1.blockShifted)),
            WRepeatChar('↓', 8),
            WBlockWidthBytes('PC2 Permutation table', PC2, 8, keyStep1.result, BYTE_STYLE_KEY),
            WRepeatChar('↓', 6),
            Div(WBytesAsBits(keyStep1.result)),
            WBlockedBytes('Result', keyStep1.result, BYTE_STYLE_KEY),
        ),

        Div(
            H4('Expansion table', {'classes': 'subtitle'}),
            {'classes': 'single-permutation-block'},
            WBlockedBytes('Right part in step 1', iter1.rightPart, BYTE_STYLE_DATA),
            Div(WBytesAsBits(iter1.rightPart)),
            WRepeatChar('↓', 8),
            WBlockWidthBytes('Expansion Table', expansionTable, 8, iter1.expandedValue, BYTE_STYLE_DATA),
            WRepeatChar('↓', 6),
            Div(WBytesAsBits(iter1.expandedValue)),
            WBlockedBytes('Result', iter1.expandedValue, BYTE_STYLE_DATA),
        ),

        Div(
            H4('Final Reverse of Initial Permutation', {'classes': 'subtitle'}),
            {'classes': 'single-permutation-block'},
            WBlockedBytes('Block[0] pre output block', block.preOutputBlock, BYTE_STYLE_DATA),
            Div(WBytesAsBits(block.preOutputBlock)),
            WRepeatChar('↓', 8),
            WBlockWidthBytes('Reverse Initial Permutation table', inverseInitialPermutaionTable, 8, block.result, BYTE_STYLE_DATA),
            WRepeatChar('↓', 8),
            Div(WBytesAsBits(block.result)),
            WBlockedBytes('Result', block.result, BYTE_STYLE_DATA),
        ),
        ),


    );
}

function sFunctionPage(state) {
    let log = state.sboxLog;
    let tables = [];
    // for(let box of SBoxes) {
    for(let i = 0; i < SBoxes.length; i++) {
        let box = SBoxes[i];
        tables.push(WBlockTable('SBox #' + (i+1), box, 16));
        tables.push(Div({'classes': 'h-pad'}));
    }

    let stepsW = [];
    for(let i = 0; i < log.steps.length; i++) {
        let step = log.steps[i];
        let w = Div(
            Div(`${step.x}, ${step.y}, (${step.offset}) ${step.value.toString(16)}`),
        );
        stepsW.push(w);
    }

    return Div(
        H4('SFunction'),
        WBlockedBytes('start value', state.sboxLog.start, BYTE_STYLE_DATA),
        WSboxBits(state.sboxLog.start, log.steps),

        // stepsW,

        WRepeatChar('↓', 4),
        WBlockedBytes('result', state.sboxLog.result, BYTE_STYLE_DATA),

        Div(
            {'attrs': {'style': 'margin-top: 40px;'}},
            H3('Static SBox tables'),
            Div(
                {'classes': 'row'},
                tables,
            ),
        ),
    );
}

function checkError(state) {
    let isError = false;
    let message = "---"

    // TODO: This is copy-pasta. Make sure to get this from one place
    let inputNode = document.querySelector("#input");
    let inputKeyNode = document.querySelector("#input-key");
    let initVectorNode = document.querySelector("#initialization-vector");

    if(inputNode.value.length == 0) {
        isError = true;
        message = Div('Please enter some input to proceed.');
        return [isError, message];
    }
    else if(state.userKeyBytes.length != 8) {
        isError = true;
        message = Div(`Please provide 8 byte key as a hex string. You provided ${state.userKeyBytes.length} byte key`);
        return [isError, message];
    }


    return [isError, message];
}

function display(state) {
    let path = window.location.hash.slice(1);

    let output = document.createElement('div');
    const [isError,  message] = checkError(state);

    let parentNode = document.querySelector("#calc-output");
    parentNode.innerHTML = '';

    if(!isError) {
        let menuItems = document.querySelectorAll('.menu .item');
        for(let item of menuItems) {
            let itemPath = '';
            let itemPathParts = item.href.split('#');
            if(itemPathParts.length > 1) { itemPath = itemPathParts[1]; }

            if(itemPath == path) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }


        }
        switch(path) {
            case '': 
            case 'general': {
                output = generalPage(state);
            } break;

            case 'keys': {
                output = keysPage(state);
            } break;

            case 'permutations': {
                output = permutationsPage(state);
            } break;

            case 'sfunction': {
                output = sFunctionPage(state);
            } break;
        }
    } else {
        output = Div(
            {'classes': 'general-error-block'},
            message
        );
    }
   

    parentNode.appendChild(output);
}
