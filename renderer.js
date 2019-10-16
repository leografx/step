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

function leftPad(value) { return (value.toString().length < paddingAmount) ? leftPad("0" + value) : value; }

function onChange() {
    setDOMPageProperties();
    paddingAmount = calculateLeftPadAmount();
    calculateScaleFactor();
    setCanvasPageSize();
    centerPageInViewPort();
    createLayout();
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
    const margins = getMargins();

    let divBox = `<div class="trim-area" id="trim-area" style="display:grid; 
    grid-template-columns:repeat(${columns}, ${trimSize.width}px);
    grid-template-rows: repeat(${rows}, ${trimSize.height}px);
    column-gap: ${gutters.x}px;
    row-gap: ${gutters.y}px;
    margin-left:${margins.left}px;
    margin-right:${margins.right}px;
    margin-top:${margins.top}px;
    margin-bottom:${margins.bottom}px;
    ">`;

    for (let i = 0; i < boxCount; i++) {
        divBox += '<div class="item"></div>';
    }
    divBox += '</div>';
    document.querySelector('#canvas-page').innerHTML = divBox;
    // #trim-area {
    //     display: grid;
    //     grid-template-columns: repeat(2, 252px);
    //     grid-template-rows: repeat(4, 144px);
    //     background-color: #fff;
    //     column-gap: 18px;
    //     row-gap: 18px;
    //     margin-top: 100px;
    //     margin-bottom: 100px;
    //     margin-left: auto;
    //     margin-right: auto;
    // }
}

(function onInit() {
    window.onresize = function() {
        onChange();
    }

    applyListeners();
    onChange();
}());