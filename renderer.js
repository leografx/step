let pageProperties;
let paddingAmount = 0;
let leftPadIsChecked = false;
let scaleFactor = 72;

function selectDOMPageProperties() {
    pageProperties = document.querySelector('#page-properties');
}


function applyListeners() {
    selectDOMPageProperties();
    document.querySelectorAll('#page-properties input').forEach(element => {
        element.addEventListener('change', onPropertyChange);
    });
}


function onPropertyChange(element) {

    paddingAmount = calculateLeftPadAmount();
    calculateScaleFactor();
    setCanvasPageSize();
    updateMargins();

    if (element.target.id === 'left-pad') {
        leftPadIsChecked = element.target.checked;
    }

    if (leftPadIsChecked) {

    }
}

function calculateLeftPadAmount() {
    const start = getValueAsInt('#start');
    const quantity = getValueAsInt('#quantity');
    return (start + quantity).toString().length;
}

function leftPad(value) {
    return (value.toString().length < paddingAmount) ? leftPad("0" + value) : value;
}

function getValueAsInt(selector) {
    return parseInt(pageProperties.querySelector(selector).value);
}

function getValueAsFloat(selector) {
    return parseFloat(pageProperties.querySelector(selector).value);
}

function setCanvasPageSize() {
    const page = getPageDimensions();
    const w = page.width;
    const h = page.height;
    document.querySelector('#canvas-area #canvas-page').style.width = w + 'px';
    document.querySelector('#canvas-area #canvas-page').style.height = h + 'px';
    calculateMargin(w, h);
}

function getPageDimensions() {
    const actualWidth = getValueAsFloat('#width');
    const actualHeight = getValueAsFloat('#height');
    const w = actualWidth * scaleFactor;
    const h = actualHeight * scaleFactor;
    return { width: w, height: h, actualWidth: actualWidth, actualHeight: actualHeight };
}

function getCanvasAreaDimensions() {
    const canvasArea = document.querySelector('div #canvas-area');
    let w = parseFloat(canvasArea.offsetWidth);
    let h = parseFloat(canvasArea.offsetHeight);
    return { width: w, height: h };
}

function calculateMargin(pgW, pgH) {
    const canvasArea = getCanvasAreaDimensions();
    document.querySelector('#canvas-page').style.marginLeft = (canvasArea.width - pgW) / 2 + 'px';
    document.querySelector('#canvas-page').style.marginTop = (canvasArea.height - pgH) / 2 + 'px';
}

function updateMargins() {
    marginCalculate();
}

function getRows() {
    return getValueAsInt('#rows');
}

function getColumns() {
    return getValueAsInt('#columns');
}

function getMargins() {
    const actualMarginTop = getValueAsFloat('#margin-top');
    const actualMarginLeft = getValueAsFloat('#margin-left');
    const actualMarginBottom = getValueAsFloat('#margin-bottom');
    const actualMarginRight = getValueAsFloat('#margin-right');
    const top = actualMarginTop * scaleFactor;
    const left = actualMarginLeft * scaleFactor;
    const bottom = actualMarginBottom * scaleFactor;
    const right = actualMarginRight * scaleFactor;
    return { top, left, bottom, right, actualMarginTop, actualMarginLeft, actualMarginBottom, actualMarginRight };
}

function marginCalculate() {
    const margin = getMargins();
    const columns = getColumns();
    const rows = getRows();
    const page = getPageDimensions();
    const pageWidth = page.width;
    const pageHeight = page.height;

    const pageMarginTop = document.querySelector('#page-margin-top');
    pageMarginTop.style.height = margin.top + 'px';
    pageMarginTop.style.width = (pageWidth / columns) + 'px';

    const pageMarginLeft = document.querySelector('#page-margin-left');
    pageMarginLeft.style.width = margin.left + 'px';
    pageMarginLeft.style.height = (pageHeight / rows) + 'px';
    pageMarginLeft.style.left = '0px;'

    const pageMarginBottom = document.querySelector('#page-margin-bottom');
    pageMarginBottom.style.height = margin.bottom + 'px';
    pageMarginBottom.style.width = (pageWidth / columns) + 'px';
    pageMarginBottom.style.bottom = ((pageHeight * rows) / rows) - (pageHeight / rows) + 'px';

    const pageMarginRight = document.querySelector('#page-margin-right');
    pageMarginRight.style.width = margin.right + 'px';
    pageMarginRight.style.height = (pageHeight / rows) + 'px';
    pageMarginRight.style.right = ((pageWidth / columns) * columns) - (pageWidth / columns) + 'px';
}

function calculateScaleFactor() {
    const canvas = getCanvasAreaDimensions();
    const page = getPageDimensions();
    scaleFactor = (page.height >= page.width) ? ((canvas.height - scaleFactor) / (page.height / scaleFactor)) : ((canvas.width - scaleFactor) / (page.width / scaleFactor));
}

window.onresize = function() {
    calculateScaleFactor();
    setCanvasPageSize();
    updateMargins();
}


applyListeners();
calculateScaleFactor();
setCanvasPageSize();
updateMargins();