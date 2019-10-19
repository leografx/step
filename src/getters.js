// getters
function getColumns() { return getValueAsInt('#columns') }

function getFontColor() { return layers[activeLayer].fontColor }



function getRows() { return getValueAsInt('#rows') }

function getStartingNumber() { return pageProperties.querySelector('#start').value }

function getValueAsFloat(selector) { return parseFloat(pageProperties.querySelector(selector).value) }

function getValueAsInt(selector) { return parseInt(pageProperties.querySelector(selector).value) }

function getTrimSize() {
    const w = getValueAsFloat('#trim-size-w') * scaleFactor;
    const h = getValueAsFloat('#trim-size-h') * scaleFactor;
    return { width: w, height: h };
}



function getGutters() {
    const x = getValueAsFloat('#gutter-x') * scaleFactor;
    const y = getValueAsFloat('#gutter-y') * scaleFactor;
    return { x: x, y: y };
}