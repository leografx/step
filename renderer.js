let pageProperties;
let paddingAmount = 0;
let leftPadIsChecked = false;
let scaleFactor = 72;

// getters
function getColumns() { return getValueAsInt('#columns') }

function getFontColor() { return pageProperties.querySelector('#font-color').value }

function getPostfix() { return pageProperties.querySelector('#postfix').value }

function getPrefix() { return pageProperties.querySelector('#prefix').value }

function getRows() { return getValueAsInt('#rows') }

function getStartingNumber() { return pageProperties.querySelector('#start').value }

function getValueAsFloat(selector) { return parseFloat(pageProperties.querySelector(selector).value) }

function getValueAsInt(selector) { return parseInt(pageProperties.querySelector(selector).value) }

function getTrimSize() {
    const w = getValueAsFloat('#trim-size-w') * scaleFactor;
    const h = getValueAsFloat('#trim-size-h') * scaleFactor;
    return { width: w, height: h };
}

function getMargins() {
    const left = getValueAsFloat('#margin-left') * scaleFactor;
    const right = getValueAsFloat('#margin-right') * scaleFactor;
    const top = getValueAsFloat('#margin-top') * scaleFactor;
    const bottom = getValueAsFloat('#margin-bottom') * scaleFactor;

    return { left, right, top, bottom };
}

function getGutters() {
    const x = getValueAsFloat('#gutter-x') * scaleFactor;
    const y = getValueAsFloat('#gutter-y') * scaleFactor;
    return { x: x, y: y };
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

// setters
function setDOMPageProperties() { pageProperties = document.querySelector('#page-properties') }

function applyListeners() {
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

function calculateLeftPadAmount() {
    const start = getValueAsInt('#start');
    const quantity = getValueAsInt('#quantity');
    return (start + quantity).toString().length;
}

function calculateScaleFactor() {
    const canvas = getCanvasAreaDimensions();
    const page = getPageDimensions();
    const ifTrue = ((canvas.height - scaleFactor) / (page.height / scaleFactor));
    const ifFalse = ((canvas.width - scaleFactor) / (page.width / scaleFactor))

    scaleFactor = (page.height >= page.width) ? ifTrue : ifFalse;
}

function centerPageInViewPort() {
    const canvasArea = getCanvasAreaDimensions();
    const pageSize = getPageDimensions();
    document.querySelector('#canvas-page').style.marginLeft = (canvasArea.width - pageSize.width) / 2 + 'px';
    document.querySelector('#canvas-page').style.marginTop = (canvasArea.height - pageSize.height) / 2 + 'px';
    // document.querySelector('#canvas-page').style.marginLeft = 'auto';
    // document.querySelector('#canvas-page').style.marginRight = 'auto';
    // document.querySelector('#canvas-page').style.marginTop = 'auto';
    // document.querySelector('#canvas-page').style.marginBottom = 'auto';
}

function changeTextAlignment(e) {
    let icons = document.querySelectorAll('.align');
    icons[0].src = 'images/lnr-text-align-left.svg';
    icons[1].src = 'images/lnr-text-align-center.svg';
    icons[2].src = 'images/lnr-text-align-right.svg';

    const textBox = document.querySelector('.item');
    textBox.style.textAlign = e.target.id;
    e.target.src = e.target.alt;
}

function leftPad(value) { return (value.toString().length < paddingAmount) ? leftPad("0" + value) : value; }

function onChange() {
    setDOMPageProperties();
    paddingAmount = calculateLeftPadAmount();
    calculateScaleFactor();
    setCanvasPageSize();
    createLayout();
    centerPageInViewPort();
}

function setCanvasPageSize() {
    const page = getPageDimensions();
    const w = page.width;
    const h = page.height;
    document.querySelector('#canvas-area #canvas-page').style.width = w + 'px';
    document.querySelector('#canvas-area #canvas-page').style.height = h + 'px';
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

function createLayout() {
    const columns = getColumns();
    const rows = getRows();
    const boxCount = columns * rows;
    const trimSize = getTrimSize();
    const gutters = getGutters();
    // const margins = getMargins();
    let start = getStartingNumber();
    const prefix = getPrefix();
    const postfix = getPostfix();


    let trimArea = `<div class="trim-area" id="trim-area" style="display:grid; 
    grid-template-columns:repeat(${columns}, ${trimSize.width}px);
    grid-template-rows: repeat(${rows}, ${trimSize.height}px);
    column-gap: ${gutters.x}px;
    row-gap: ${gutters.y}px;
    "></div>`;
    let divBox = '';
    for (let i = 0; i < boxCount; i++) {
        divBox += `<div class="item"> <div>${prefix}${start++}${postfix}</div> </div>`;
    }
    document.querySelector('#canvas-page').innerHTML = trimArea;
    document.querySelector('#trim-area').innerHTML = divBox;
    calculateMargins();
    itemTextChange();

}

function itemTextChange() {
    const fontSize = getValueAsFloat('#font-size');
    // console.log(fontSize / 72 * scaleFactor);
    document.querySelectorAll('.item').forEach(element => {
        element.firstElementChild.style.fontSize = ((fontSize / 72) * scaleFactor) + 'px';
        element.firstElementChild.style.color = getFontColor();
        element.firstElementChild.style.marginLeft = getMargins().left + 'px';
        element.firstElementChild.style.marginTop = getMargins().top + 'px';
    });
}

function calculateMargins() {
    const columns = getColumns();
    const rows = getRows();
    const trimSize = getTrimSize();
    const gutters = getGutters();
    //const margins = getMargins();
    const page = getPageDimensions()

    let marginSum = page.width;
    marginSum -= (gutters.x * (columns - 1)) + (trimSize.width * columns);
    marginSum /= 2;
    // console.log(marginSum)
    document.querySelector('#trim-area').style.marginLeft = marginSum + 'px';
    document.querySelector('#trim-area').style.marginRight = marginSum + 'px';

    let marginTopSum = page.height;
    marginTopSum -= (gutters.y * (rows - 1)) + (trimSize.height * rows);
    marginTopSum /= 2;
    // console.log(marginSum)
    document.querySelector('#trim-area').style.marginTop = marginTopSum + 'px';
    document.querySelector('#trim-area').style.marginBottom = marginTopSum + 'px';
}

(function onInit() {
    window.onresize = function () {
        onChange();
    }

    applyListeners();
    onChange();
}());