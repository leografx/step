let pageProperties;
let paddingAmount = 0;
let leftPadIsChecked = false;

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
    const w = getValueAsFloat('#width') * 72;
    const h = getValueAsFloat('#height') * 72;
    document.querySelector('#canvas-area #canvas-page').style.width = w + 'px';
    document.querySelector('#canvas-area #canvas-page').style.height = h + 'px';
    calculateMargin(w, h);
}

function calculateMargin(pgW, pgH) {
    const canvasArea = document.querySelector('div #canvas-area');
    let w = parseFloat(canvasArea.offsetWidth);
    let h = parseFloat(canvasArea.offsetHeight);
    console.log('Area', w, h, pgW, pgH, canvasArea);
    document.querySelector('#canvas-page').style.marginLeft = (w - pgW) / 2 + 'px';
    document.querySelector('#canvas-page').style.marginTop = (h - pgH) / 2 + 'px';
}

function updateMargins() {
    marginCalculate();
}

function marginCalculate() {
    const columns = getValueAsInt('#columns');
    const rows = getValueAsInt('#rows');
    const pageWidth = getValueAsFloat('#width');
    const pageHeight = getValueAsFloat('#height');

    const marginTop = getValueAsFloat('#margin-top');
    const pageMarginTop = document.querySelector('#page-margin-top');
    pageMarginTop.style.height = (marginTop * 72) + 'px';
    pageMarginTop.style.width = (pageWidth * 72) / columns + 'px';

    const marginLeft = getValueAsFloat('#margin-left');
    const pageMarginLeft = document.querySelector('#page-margin-left');
    pageMarginLeft.style.width = (marginLeft * 72) + 'px';
    pageMarginLeft.style.height = (pageHeight * 72) / rows + 'px';
    pageMarginLeft.style.left = '0px;'

    const marginBottom = getValueAsFloat('#margin-bottom');
    const pageMarginBottom = document.querySelector('#page-margin-bottom');
    pageMarginBottom.style.height = (marginBottom * 72) + 'px';
    pageMarginBottom.style.width = (pageWidth * 72) / columns + 'px';
    pageMarginBottom.style.bottom = (((pageHeight * rows) * 72) / rows) - ((pageHeight * 72) / rows) + 'px';

    const marginRight = getValueAsFloat('#margin-right');
    const pageMarginRight = document.querySelector('#page-margin-right');
    pageMarginRight.style.width = (marginRight * 72) + 'px';
    pageMarginRight.style.height = (pageHeight * 72) / rows + 'px';
    pageMarginRight.style.right = ((pageWidth * 72) - ((pageWidth * 72) / columns)) + 'px';
}

window.onresize = function() {
    setCanvasPageSize();
}

applyListeners();
setCanvasPageSize();
updateMargins();