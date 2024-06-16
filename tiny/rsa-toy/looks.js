
// function showPreparedInput(string) {
//     // NOTE: Experimental testing of working with strings instead of nodes
//     string = string.trim();
//     let items = [];
//     if(string.startsWith('0x') || string.startsWith('0X')) {
//         let prefix = document.createElement('div');
//         prefix.classList.add('hex-prefix');
//         prefix.innerHTML = '0x';
//         items.push(prefix.outerHTML);
//         string = string.slice(2);
//     }
//
//     header = string.slice(11);
//     placeholder = string.slice(11);
//     realData = string.slice(11);
//
//     let x = items.join();
//     return x;
// }

function _bytesToHexString(bytes) {
    let result = "";
    for(let i = 0; i < bytes.length; i++) {
        let string = bytes[i].toString(16)
        if(string.length == 2) { result += string; }
        else if(string.length == 1){ result += `0${string}`; }
    }
    return result;
}

function showPreparedInput(rawData, realDataStartOffset) {
    header = rawData.slice(0, 11);
    placeholder = rawData.slice(11, realDataStartOffset);
    data = rawData.slice(realDataStartOffset);
    let items = [];

    let prefixNode = document.createElement('span');
    prefixNode.classList.add('hex-prefix');
    prefixNode.innerHTML = '0x';
    items.push(prefixNode.outerHTML);

    let headerNode = document.createElement('span');
    headerNode.classList.add('rsa-input-header');
    headerNode.innerHTML = _bytesToHexString(header);
    items.push(headerNode.outerHTML);

    let placeholderNode = document.createElement('span');
    placeholderNode.classList.add('rsa-input-placeholder');
    placeholderNode.innerHTML = _bytesToHexString(placeholder);
    items.push(placeholderNode.outerHTML);

    let dataNode = document.createElement('span');
    dataNode.classList.add('rsa-input-data');
    dataNode.innerHTML = _bytesToHexString(data);
    items.push(dataNode.outerHTML);

    return items.join('');
}

function showRawDecryptedData(rawData, realDataStartOffset) {
    header = rawData.slice(0, 11);
    placeholder = rawData.slice(11, realDataStartOffset);
    data = rawData.slice(realDataStartOffset);
    let items = [];

    let prefixNode = document.createElement('span');
    prefixNode.classList.add('hex-prefix');
    prefixNode.innerHTML = '0x';
    items.push(prefixNode.outerHTML);

    let headerNode = document.createElement('span');
    // headerNode.classList.add('rsa-input-header');
    headerNode.innerHTML = _bytesToHexString(header);
    items.push(headerNode.outerHTML);

    let placeholderNode = document.createElement('span');
    // placeholderNode.classList.add('rsa-input-placeholder');
    placeholderNode.innerHTML = _bytesToHexString(placeholder);
    items.push(placeholderNode.outerHTML);

    let dataNode = document.createElement('span');
    dataNode.classList.add('decoded-actual-data');
    dataNode.innerHTML = _bytesToHexString(data);
    items.push(dataNode.outerHTML);

    return items.join('');
}

function showHex(rawData) {
    let items = [];

    let prefixNode = document.createElement('span');
    prefixNode.classList.add('hex-prefix');
    prefixNode.innerHTML = '0x';
    items.push(prefixNode.outerHTML);

    let contentNode = document.createElement('span');
    contentNode.innerHTML = _bytesToHexString(rawData);
    items.push(contentNode.outerHTML);

    return items.join('');
}
