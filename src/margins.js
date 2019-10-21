let x;
let y;

function setMargins() {
    layers[activeLayer].margins.left = getValueAsFloat('#margin-left');
    layers[activeLayer].margins.right = getValueAsFloat('#margin-right');
    layers[activeLayer].margins.top = getValueAsFloat('#margin-top');
    layers[activeLayer].margins.bottom = getValueAsFloat('#margin-bottom');
}

function getMargins() {
    const margins = layers[activeLayer].margins
    const left = margins.left * scaleFactor;
    const right = margins.right * scaleFactor;
    const top = margins.top * scaleFactor;
    const bottom = margins.bottom * scaleFactor;

    return { left, right, top, bottom };
}

function calculateMargins() {
    const columns = getColumns();
    const rows = getRows();
    const trimSize = getTrimSize();
    const gutters = getGutters();
    const page = getPageDimensions()

    let marginSum = page.width;
    marginSum -= (gutters.x * (columns - 1)) + (trimSize.width * columns);
    marginSum /= 2;

    document.querySelector('#' + layers[activeLayer].name).style.marginLeft = marginSum + 'px';
    document.querySelector('#' + layers[activeLayer].name).style.marginRight = marginSum + 'px';

    let marginTopSum = page.height;
    marginTopSum -= (gutters.y * (rows - 1)) + (trimSize.height * rows);
    marginTopSum /= 2;

    document.querySelector('#' + layers[activeLayer].name).style.marginTop = marginTopSum + 'px';
    document.querySelector('#' + layers[activeLayer].name).style.marginBottom = marginTopSum + 'px';
}

function changeMargins(side) {
    let marginTop = document.querySelector(`#handle-margin-${side}`);
    let top = pageProperties.querySelector('#margin-top');
    top.value = marginTop.value;
    marginTop.value = top.value;

    onChange();
}


function setOrigin(e) {
    x = e.clientX;
    y = e.clientY;
    console.log(x, y);
}