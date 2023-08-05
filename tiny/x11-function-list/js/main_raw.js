
// TODO: v1. This is written all in one go. Bad code, rewrite into more modular form

let globalData = [];

let globalFilterString = "";

let filterTypes = {
    "all": true,
    "return": false,
    "name": false,
    "params": false,
};

let showTypes = {
    "all": true,
    "return": false,
    "name": false,
    "params": false,
};

function loadFile(url, action) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onerror = function() {
        console.log("loadFile: Error...");
    }

    xhr.onprogress = function() {
        // console.log("loadFile: Progress...");
    }

    xhr.onload = function(e) {
        if(xhr.status == 200) {
            globalData = JSON.parse(xhr.response);
            if(action !== undefined) {
                action();
            }
        } else {
        }
    }
}

function splitByFound(string, regexpResult, className, prefixExtra, suffixExtra) {
    let container = document.createElement("span");

    prefixExtra = (prefixExtra == undefined) ? "" : prefixExtra;
    suffixExtra = (suffixExtra == undefined) ? "" : suffixExtra;

    container.classList.add(className);
    let r = regexpResult;
    if(r) {
        let pre = document.createElement("span");
        let middle = document.createElement("span");
        let post = document.createElement("span");

        let prefixString = string.substring(0, r.index);
        pre.innerHTML = prefixExtra + prefixString;

        let foundStringPart = string.substring(r.index, r.index + r[0].length);
        middle.innerHTML = foundStringPart;
        middle.classList.add("found-string-highlight");

        let postString = string.substring(r.index + r[0].length, string.length);
        post.innerHTML = postString + suffixExtra;

        container.append(pre);
        container.append(middle);
        container.append(post);

    } else {
        container.innerHTML = string;
    }
    return container;
}

function createItemNode(item, matchList) {
    let row = document.createElement("div");
    row.classList.add("search-row");

    let returnMatch = matchList[0];
    let functionNameMatch = matchList[1];
    let paramsMatch = matchList[2];

    if(showTypes['all'] || showTypes['return']) {
        let returnResults = document.createElement("span");
        returnResults.classList.add("function-return");
        row.appendChild(splitByFound(item['return'], returnMatch, "function-return"));
    }

    if(showTypes['all'] || showTypes['name']) {
        let functionName = document.createElement("span");
        functionName.classList.add("function-name");
        row.appendChild(splitByFound(item['name'], functionNameMatch, "function-name"));
    }

    if(showTypes['all'] || showTypes['params']) {
        let parameters = document.createElement("span");
        parameters.classList.add("function-parameters");
        row.appendChild(splitByFound(item['params'], paramsMatch, "function-parameters", "(", ")"));
    }




    return row;
}
globalFilterString
function reCreateList() {
    filterText = (globalFilterString === undefined) ? "" : globalFilterString.toLowerCase();
    let listContainer = document.getElementById("data-items-list");
    listContainer.innerHTML = "";
    for(let i = 0; i < globalData.length; i++) {
        let item = globalData[i];

        let returnType = item['return'].toLowerCase();
        let functionName = item['name'].toLowerCase();
        let params = item['params'].toLowerCase();

        let returnMatch = null;
        let functionNameMatch = null;
        let paramsMatch = null;

        if(filterTypes['all'] || filterTypes['return']) {
            returnMatch = returnType.match(new RegExp(filterText));
        }

        if(filterTypes['all'] || filterTypes['name']) {
            functionNameMatch = functionName.match(new RegExp(filterText));
        }

        if(filterTypes['all'] || filterTypes['params']) {
            paramsMatch = params.match(new RegExp(filterText));
        }

        let foundInRow = returnMatch || functionNameMatch || paramsMatch;

        if(foundInRow) {
            listContainer.appendChild(createItemNode(item, [returnMatch, functionNameMatch, paramsMatch]));
        }
    }
}


document.addEventListener("DOMContentLoaded", function() {

    loadFile("data.json", function() {
        reCreateList();
    });

    let searchInput = document.getElementById("function-search-input");
    searchInput.addEventListener("input", function(e) {
        let searchString = this.value;
        globalFilterString = searchString;
        reCreateList();
    });



    let filterRadioButton = document.getElementsByName("filter");
    for(let i = 0; i < filterRadioButton.length; i++) {
        let elem = filterRadioButton[i];
        elem.addEventListener("change", function(e) {
            let properties = Object.getOwnPropertyNames(filterTypes);
            for(let propertyIndex = 0; propertyIndex < properties.length; propertyIndex++) {
                let property = properties[propertyIndex];
                if(property == this.value) {
                    filterTypes[property] = true;
                } else {
                    filterTypes[property] = false;
                }
            }
            reCreateList();
        });
    }

    // TODO: Merge copy/pasta
    let showRadioButton = document.getElementsByName("show");
    for(let i = 0; i < showRadioButton.length; i++) {
        let elem = showRadioButton[i];
        elem.addEventListener("change", function(e) {
            let properties = Object.getOwnPropertyNames(showTypes);
            for(let propertyIndex = 0; propertyIndex < properties.length; propertyIndex++) {
                let property = properties[propertyIndex];
                if(property == this.value) {
                    showTypes[property] = true;
                } else {
                    showTypes[property] = false;
                }
            }
            reCreateList();
        });
    }

    let toggleFilter = document.getElementById("toggle-filter-button");
    let toggleShow = document.getElementById("toggle-show-button");


    toggleFilter.addEventListener("click", function() {
        let filterHolder = document.getElementById("filter-holder");
        console.log(filterHolder);

        let value = (this.dataset.selected == 'false') ? false : true;
        let newValue = !value;
        this.dataset.selected = (newValue).toString();
        if(newValue) {
            this.classList.add('selected');
            filterHolder.classList.remove('hidden');
        } else {
            this.classList.remove('selected');
            filterHolder.classList.add('hidden');
        }
    });

    toggleShow.addEventListener("click", function() {
        let showHolder = document.getElementById("show-holder");

        let value = (this.dataset.selected == 'false') ? false : true;
        let newValue = !value;
        this.dataset.selected = (newValue).toString();
        if(newValue) {
            this.classList.add('selected');
            showHolder.classList.remove('hidden');
        } else {
            this.classList.remove('selected');
            showHolder.classList.add('hidden');
        }
    });

});
