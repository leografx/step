let pageProperties;
let paddingAmount = 0;
let leftPadIsChecked = false;
let scaleFactor = 72;

function setDOMPageProperties() {
    pageProperties = document.querySelector('#page-properties');
}

function applyListeners() {
    setDOMPageProperties();
    document.querySelectorAll('.collapsible-trigger').forEach(element => {
        element.addEventListener('click', toggle);
    });

    document.querySelectorAll('#page-properties input').forEach(element => {
        element.addEventListener('change', onChange);
    });

    document.querySelectorAll('.align').forEach(element => {
        element.addEventListener('click', changeTextAlignment);
    });
}

function toggle(e) {
    const section = document.getElementById('toggle-' + e.target.parentNode.id);
    const chevronRight = 'images/lnr-chevron-right.svg';
    const chevronDown = 'images/lnr-chevron-down.svg';

    try {
        if (section.style.display !== 'grid') {
            section.style.display = 'grid';
            e.target.parentNode.firstElementChild.src = chevronDown;
            e.target.parentNode.style.borderBottom = '0px';
        } else {
            section.style.display = 'none';
            e.target.parentNode.firstElementChild.src = chevronRight;
            e.target.parentNode.style.borderBottom = '1px solid #2A2A2A';
        }
    } catch {
        console.log('Oops!');
    }
}

function changeTextAlignment(e) {
    let icons = document.querySelectorAll('.align');
    icons[0].src = 'images/lnr-text-align-left.svg';
    icons[1].src = 'images/lnr-text-align-center.svg';
    icons[2].src = 'images/lnr-text-align-right.svg';

    const textBox = document.querySelector('#number-box-1');
    textBox.style.textAlign = e.target.id;
    e.target.src = e.target.alt;
}

function onChange() {
    paddingAmount = calculateLeftPadAmount();
    calculateScaleFactor();
    setCanvasPageSize();
    // updateMargins();
    // updateNumberBox();
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

function getStartingNumber() {
    return pageProperties.querySelector('#start').value;
}

function getPrefix() {
    return pageProperties.querySelector('#prefix').value;
}

function getFontColor() {
    return pageProperties.querySelector('#font-color').value;
}

function getPostfix() {
    return pageProperties.querySelector('#postfix').value;
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
    const condition = (page.height >= page.width);
    const ifTrue = ((canvas.height - scaleFactor) / (page.height / scaleFactor));
    const ifFalse = ((canvas.width - scaleFactor) / (page.width / scaleFactor))

    scaleFactor = (page.height >= page.width) ? ifTrue : ifFalse;
}



function createNumberBox() {
    const columns = getColumns();
    const rows = getRows();
    const pageSize = getPageDimensions();
    const margin = getMargins();
    const page = document.querySelector('#canvas-page');

    let box = document.createElement('div');
    box.id = 'number-box-1';
    box.style.width = (pageSize.width / columns) - (margin.left + margin.right) + 'px';
    box.style.height = (pageSize.height / rows) - (margin.top + margin.bottom) + 'px';
    page.appendChild(box);
    updateNumberBox();
}

function updateNumberBox() {
    const columns = getColumns();
    const rows = getRows();
    const pageSize = getPageDimensions();
    const margin = getMargins();
    const fontSize = getValueAsFloat('#font-size');
    let box = document.querySelector('#number-box-1');
    box.style.width = (pageSize.width / columns) - (margin.left + margin.right) + 'px';
    box.style.height = (pageSize.height / rows) - (margin.top + margin.bottom) + 'px';
    box.style.position = 'absolute';
    box.style.top = margin.top + 'px';
    box.style.left = margin.left + 'px';
    box.style.border = '1px';
    box.style.borderStyle = 'solid';
    box.style.borderColor = 'green';
    box.style.backgroundColor = '#d7d7d7';
    box.style.color = getFontColor();
    box.style.fontSize = ((fontSize * scaleFactor) / 72) + 'px';
    const prefix = getPrefix() || '';
    const postfix = getPostfix() || '';

    if (document.querySelector('#left-pad').checked) {
        box.innerHTML = `${prefix}${leftPad(getStartingNumber())}${postfix}`;
    } else {
        box.innerHTML = `${prefix}${getValueAsInt('#start')}${postfix}`;
    }

}



(function onInit() {
    window.onresize = function () {
        onChange();
    }

    applyListeners();

    // calculateScaleFactor();
    // setCanvasPageSize();
    // updateMargins();
    // createNumberBox();
    onChange();
}());