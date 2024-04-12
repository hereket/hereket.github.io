function processProps(node, obj) {
    if(obj.hasOwnProperty('attrs')) {
        for(let [key, value] of Object.entries(obj['attrs'])) {
            node.setAttribute(key, value);
        }
    }

    if(obj.hasOwnProperty('classes')) {
        let classes = obj['classes'].split(" "); // TODO: Verify that it is string
        for(let c of classes) {
            if(c.trim().length > 0) {
                node.classList.add(c);
            }
        }
    }

    if(obj.hasOwnProperty('events')) {
        for(let [key, value] of Object.entries(obj['events'])) {
            node.addEventListener(key, value);
        }
    }
}

function Tag(tagName, ...children) {
    let node = document.createElement(tagName)

    for(let child of children) {
        if(child instanceof Node) {
            node.appendChild(child);
        } else if(typeof(child) == 'string') {
            node.appendChild(document.createTextNode(child));
        } else if(Array.isArray(child)) {
            for(let subchild of child) { node.appendChild(subchild); }
        } else if(typeof(child) == 'object') {
            processProps(node, child);
        } else {
            console.log('ERROR: Unsupported type', child);
        }
    }

    return node;
}


function Div(...children) { return Tag('div', ...children) }
function H1(...children) { return Tag('h1', ...children) }
function H2(...children) { return Tag('h2', ...children) }
function H3(...children) { return Tag('h3', ...children) }
function H4(...children) { return Tag('h4', ...children) }
function H5(...children) { return Tag('h5', ...children) }
function H6(...children) { return Tag('h6', ...children) }
