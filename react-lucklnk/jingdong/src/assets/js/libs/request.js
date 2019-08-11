import ReactDOM from 'react-dom';

let load = ReactDOM.findDOMNode(document.getElementById("page-load"));

function request(pUrl, pType = 'GET') {
    showLoad();
    return fetch(pUrl, {
        method: pType
    }).then(res => {
        hideLoad()
        return res.json()
    })
}

function showLoad() {
    load.style.display = "block"
}

function hideLoad() {
    load.style.display = "none"
}

export {
    request
}