const BIT_COUNT_IN_BYTE = 8;
const PC1 = [
    57, 49, 41, 33, 25, 17, 9 ,
    1 , 58, 50, 42, 34, 26, 18,
    10, 2 , 59, 51, 43, 35, 27,
    19, 11, 3 , 60, 52, 44, 36,
    63, 55, 47, 39, 31, 23, 15,
    7 , 62, 54, 46, 38, 30, 22,
    14, 6 , 61, 53, 45, 37, 29,
    21, 13, 5 , 28, 20, 12, 4

];

const PC2 = [
    14, 17, 11, 24, 1 , 5 ,
    3 , 28, 15, 6 , 21, 10,
    23, 19, 12, 4 , 26, 8 ,
    16, 7 , 27, 20, 13, 2 ,
    41, 52, 31, 37, 47, 55,
    30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32
];

const initialPermutationTable = [
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
    64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9 , 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7
];

const inverseInitialPermutaionTable = [
    40, 8, 48, 16, 56, 24, 64, 32,
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9 , 49, 17, 57, 25
]

const expansionTable = [
    32, 1 , 2 , 3 , 4 , 5 ,
    4 , 5 , 6 , 7 , 8 , 9 ,
    8 , 9 , 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21,
    20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29,
    28, 29, 30, 31, 32, 1
];

const SBoxes = [
    [
        14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
        0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
        4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
        15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
    ],
    [
        15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
        3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
        0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
        13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
    ],
    [
        10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
        13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
        13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
        1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
    ],
    [
        7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
        13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
        10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
        3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
    ],
    [
        2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
        14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
        4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
        11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
    ],
    [
        12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
        10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
        9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
        4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
    ],
    [
        4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
        13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
        1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
        6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
    ],
    [
        13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
        1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
        7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
        2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
    ],
];

const PTable = [
    16, 7 , 20, 21,
    29, 12, 28, 17,
    1 , 15, 23, 26,
    5 , 18, 31, 10,
    2 , 8 , 24, 14,
    32, 27, 3 , 9 ,
    19, 13, 30, 6 ,
    22, 11, 4 , 25
];

function getBit(array, bitOffset) {
    let byteOffset =  Math.floor((bitOffset / BIT_COUNT_IN_BYTE));
    let bitOffsetInByte =  (bitOffset % BIT_COUNT_IN_BYTE);
    let bitMask = 0x80 >> bitOffsetInByte; // NOTE: 1000_0000 >> x
    let result = (array[byteOffset] & bitMask) != 0;
    return (result == true) ? 1 : 0;
}

function setBit(array, bitOffset) {
    let byteOffset =  Math.floor((bitOffset / BIT_COUNT_IN_BYTE));
    let bitOffsetInByte =  (bitOffset % BIT_COUNT_IN_BYTE);
    let bitMask = 0x80 >> bitOffsetInByte; // NOTE: 1000_0000 >> x
    array[byteOffset] = array[byteOffset] | bitMask;
    return array;
}

function shiftLeftHalvesOf56Bit(keyBlock) {
    // NOTE: Do carry left for LEFT half of 28 bit block
    let carry = (keyBlock[0] & 0x80) >> 3; // NOTE: Shift half byte for later easier merge

    keyBlock[0] = (keyBlock[0] << 1) | ((keyBlock[1] & 0x80) >> 7);
    keyBlock[1] = (keyBlock[1] << 1) | ((keyBlock[2] & 0x80) >> 7);
    keyBlock[2] = (keyBlock[2] << 1) | ((keyBlock[3] & 0x80) >> 7);

    // NOTE: Middle Byte
    let ByteLeftPart = (((keyBlock[3] & 0xf0) << 1) | carry);

    carry = (keyBlock[3] & 0x8) >> 3; 

    let ByteRightPart = ((keyBlock[3] << 1) & 0xf)| ((keyBlock[4] & 0x80) >> 7);
    keyBlock[3] = ByteLeftPart | ByteRightPart; 

    // NOTE: Do carry left for RIGHT half of 28 bit block
    keyBlock[4] = (keyBlock[4] << 1) | ((keyBlock[5] & 0x80) >> 7);
    keyBlock[5] = (keyBlock[5] << 1) | ((keyBlock[6] & 0x80) >> 7);
    keyBlock[6] = (keyBlock[6] << 1) | carry;
}


function permute(sourceBlock, table) {
    // let result = sourceBlock.copyWithin();
    let result = new Uint8Array(table.length / BIT_COUNT_IN_BYTE);
    for(let i = 0; i < table.length; i++) {
        let bitOffset = table[i] - 1; // NOTE: We are -1 this because the values are 1 based
        let bit = getBit(sourceBlock, bitOffset);

        if(bit == 1) {
            setBit(result, i);
        }
    }

    return result;
}

function dumpBits(block) {
    result = '';
    for(let i = 0; i < block.length * BIT_COUNT_IN_BYTE; i++) {
        result += getBit(block, i);
        if((i + 1) % 8 == 0) {
            result += '.';
        }
    }
    console.log(result);
}

function toBits(block) {
    result = '';
    for(let i = 0; i < block.length * BIT_COUNT_IN_BYTE; i++) {
        result += getBit(block, i);
    }
    return result;
}

function getBytesFromHexString(string) {
    if((string.length > 2) && (string[0] == '0') && (string[1] == 'x')) {
        string = string.slice(2);
    }

    let result = new Uint8Array(string.length / 2);

    for(let i = 0; i < string.length; i += 2) {
        let left = parseInt(string[i], 16);
        let right = parseInt(string[i], 16);
        let value = left << 4 | right;
        result[i/2] = value;
    }
    return result;
}

function getBytesFromString(string) {
    let bytes = new TextEncoder().encode(string);
    return bytes;
}

function xorBlock(blockA, blockB) {
    let result = blockA.slice();
    let count = (blockA.length > blockB.length) ? blockA.length : blockB.length;

    for(let i = 0; i < count; i++) {
        result[i] = blockA[i] ^ blockB[i];
    }

    return result
}

function generateKeys(state, startKeyString) {
    let keys = [];
    if((startKeyString.length > 2) && (startKeyString[0] == '0') && (startKeyString[1] == 'x')) {
        startKeyString = startKeyString.slice(2)
    }

    if(startKeyString.length % 2 != 0) {
        startKeyString = '0' + startKeyString
    }

    let result = getBytesFromHexString(startKeyString);
    state.userKeyBytes = result;

    let keyBlock = permute(result, PC1);

    state.keyCalculationLog['start'] = result;
    state.keyCalculationLog['initialPermutation'] = keyBlock;
    state.keyCalculationLog['steps'] = [];

    for(let i = 0; i < 16; i++) {
        let iterationNumber = i + 1;

        let step = {
            'blockStart': new Uint8Array(keyBlock),
        }

        if((iterationNumber == 1) 
            || (iterationNumber == 2) 
            || (iterationNumber == 9) 
            || (iterationNumber == 16))
        {
            shiftLeftHalvesOf56Bit(keyBlock);
            step['shiftAmount'] = 1;
        } else {
            shiftLeftHalvesOf56Bit(keyBlock);
            shiftLeftHalvesOf56Bit(keyBlock);
            step['shiftAmount'] = 2;
        }

        step['blockShifted'] = new Uint8Array(keyBlock);
        step['bits'] = toBits(keyBlock);

        let key = permute(keyBlock, PC2);
        keys.push(key);

        step['result'] = key;
        state.keyCalculationLog['steps'].push(step);
    }

    return keys;
}

function expand32to48bits(part, table) {
    let result = new Uint8Array(6);
    for(let i = 0; i < table.length; i++) {
        let bitOffset = table[i] - 1;
        let bitValue = getBit(part, bitOffset);

        if(bitValue) {
            setBit(result, i);
        }
    }
    return result;
}

function SFunction(state, block48Bits, shouldLog) {
    let blockCount = 8;
    let blockPartBitSize = 6;

    let log = state.sboxLog;
    if(shouldLog) { log['start'] = block48Bits; log['steps'] = [];}

    let resultBlock = new Uint8Array(4);

    // NOTE: Get bit by bit is very inefficient, but good for current understanding
    for(let i = 0; i < blockCount; i++) {
        let Bit0 = getBit(block48Bits, blockPartBitSize*i);
        let Bit5 = getBit(block48Bits, blockPartBitSize*i + 5);

        let Bit1 = getBit(block48Bits, blockPartBitSize*i + 1);
        let Bit2 = getBit(block48Bits, blockPartBitSize*i + 2);
        let Bit3 = getBit(block48Bits, blockPartBitSize*i + 3);
        let Bit4 = getBit(block48Bits, blockPartBitSize*i + 4);
        
        let RowWidth = 16;

        let Y = Bit0 << 1 | Bit5;
        let X = (Bit1 << 3) 
              | (Bit2 << 2)
              | (Bit3 << 1)
              | (Bit4 << 0);

        let Offset = Y * RowWidth + X; 

        let Value = SBoxes[i][Offset];

        if(shouldLog) { 
            let step = {
                'value': Value,
            }
            log['steps'].push(step);
        }

        let ByteCount = Math.floor(i / 2);
        if(i % 2 == 0) { Value = Value << 4; }

        resultBlock[ByteCount] = resultBlock[ByteCount] | Value;

        if(shouldLog) { 
            let step = log['steps'][i];
            step['y'] = Y;
            step['x'] = X;
            step['offset'] = Offset;
        }
    }

    if(shouldLog) { log['result'] = resultBlock; }

    return resultBlock;
}

class State {
    constructor() {
        this.inputText = '';
        this.inputIV = new Uint8Array();
        this.inputKey = new Uint8Array();
        this.keys = [];

        this.userKeyBytes = new Uint8Array();

        this.isCBC = true;

        // this.inputBytes = new Uint8Array();
        // this.inputVector = new Uint8Array();
        // this.xoredInput = new Uint8Array();
        // this.permutedXoredInput = new Uint8Array();
        //
        // this.iterations = [];
        //
        // this.preOutputBlock = new Uint8Array();
        // this.result = new Uint8Array();

        this.keyCalculationLog = {};
        this.sboxLog = {};

        this.blocks = [];
        this.result = new Uint8Array();

    }
}

class BlockProcess {
    constructor() {
        this.inputBytes = new Uint8Array();
        this.inputVector = new Uint8Array();
        this.xoredInput = new Uint8Array();
        this.permutedXoredInput = new Uint8Array();

        this.startLeftPart = new Uint8Array();
        this.startRightPart = new Uint8Array();

        this.iterations = [];
        
        this.preOutputBlock = new Uint8Array();
        this.finalLeft = new Uint8Array();
        this.finalRight = new Uint8Array();
        this.result = new Uint8Array();
    }
}

class ChangeIteration {
    constructor() {
        this.key = new Uint8Array();
        this.leftPart = new Uint8Array();
        this.rightPart = new Uint8Array();

        this.expandedValue = new Uint8Array();
        this.xoredExpandedValue = new Uint8Array();
        this.SResult = new Uint8Array();
        this.SResultPermuted = new Uint8Array();
        this.SResultPermutedXored = new Uint8Array();
    }
}


function padInput(state) {
    let string = state.inputText;
    bytes = getBytesFromString(string);
    if(bytes.length % 8 != 0) {
        let paddingLength = 8 - (bytes.length % 8);
        state.inputText += '\0'.repeat(paddingLength)
    }
}

function DESAlgorithm(state, blockInput, initializationVector) {
    let block = new BlockProcess();

    block.inputBytes = blockInput;
    block.initVector = initializationVector;
    block.xoredInput = xorBlock(block.inputBytes, block.initVector);
    block.permutedXoredInput = permute(block.xoredInput, initialPermutationTable);

    let leftPart = block.permutedXoredInput.slice(0,4)
    let rightPart = block.permutedXoredInput.slice(4,8)

    block.startLeftPart = leftPart;
    block.startRightPart = rightPart;

    for(let i = 0; i < state.keys.length; i++) {
        let shouldLogSbox = Object.keys(state.sboxLog).length == 0;

        let it = new ChangeIteration();
        it.leftPart = leftPart;
        it.rightPart = rightPart;

        it.key = state.keys[i];

        it.expandedValue = expand32to48bits(rightPart, expansionTable);
        it.xoredExpandedValue = xorBlock(it.expandedValue, it.key);
        it.SResult = SFunction(state, it.xoredExpandedValue, shouldLogSbox);

        it.SResultPermuted = permute(it.SResult, PTable);
        it.SResultPermutedXored = xorBlock(it.SResultPermuted, leftPart);

        leftPart = rightPart;
        rightPart = it.SResultPermutedXored;

        // rightPart = leftPart;
        // leftPart = it.SResultPermutedXored;

        block.iterations.push(it);
    }

    block.preOutputBlock = [...rightPart, ...leftPart,];
    block.finalLeft = leftPart;
    block.finalRight = rightPart;
    block.result = permute(block.preOutputBlock, inverseInitialPermutaionTable);

    return block;
}

function DESAction(state) {
    state.keys = generateKeys(state, state.inputKey);

    padInput(state);
    allInputBytes = getBytesFromString(state.inputText);
    let providedIV = new Uint8Array(8);
    if(state.isCBC) {
        providedIV = getBytesFromHexString(state.inputIV);
        // providedIV = block.result;
    }

    let blockCount = Math.floor((allInputBytes.length / 8));
    for(let i = 0; i < blockCount; i++) {
        let blockInput = allInputBytes.slice(i*8, i*8+8);
        let block = DESAlgorithm(state, blockInput, providedIV);
        if(state.isCBC) {
            providedIV = block.result;
        }
        state.blocks.push(block);
    }

    let allOutputBytes = new Uint8Array(state.blocks.length * 8);
    for(let i = 0; i < state.blocks.length; i++) {
        allOutputBytes.set(state.blocks[i].result, i*8);
    }
    state.result = allOutputBytes;

    return state.result;
}


function bytesToHex(bytes) {
    let output = "0x";
    for(let b of bytes) {
        let out = b.toString(16);
        if(out.length < 2) { output += '0'; }
        output += b.toString(16);
    }
    if(output.length == 2) { output += '0'; }
    return output;
}



function update(encType) {
    let inputNode = document.querySelector("#input");
    let inputKeyNode = document.querySelector("#input-key");
    let initVectorNode = document.querySelector("#initialization-vector");


    let isCBC = encType == 'CBC';

    let state = new State();
    state.inputText = inputNode.value;
    state.inputIV = initVectorNode.value;
    state.inputKey = inputKeyNode.value;
    state.isCBC = isCBC;

    let resultBytes = DESAction(state);
    // let hex = bytesToHex(resultBytes);
    
    display(state);
}


addEventListener('DOMContentLoaded', function() {
    let inputNode = document.querySelector("#input");
    let inputKeyNode = document.querySelector("#input-key");
    let initVectorNode = document.querySelector("#initialization-vector");
    
    let encType = 'ECB';

    var encTypes = document.getElementsByName('enc-type');
    for(let enc of encTypes) {
        if(enc.checked) {
            encType = enc.value;
        }
        enc.addEventListener('input', function() {
            encType = this.value;
            update(encType);
        });
    }


    let autoUpdateList = [inputNode, inputKeyNode, initVectorNode];
    for(let item of autoUpdateList) {
        item.addEventListener('keyup', function() {
            update(encType);
        });
    }

    window.addEventListener('hashchange', function() {
        update(encType);
    });


    update(encType)
});

