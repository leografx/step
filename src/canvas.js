function getCanvasAreaDimensions() {
    const canvasArea = document.querySelector('div #canvas-area');
    let w = parseFloat(canvasArea.offsetWidth);
    let h = parseFloat(canvasArea.offsetHeight);
    return { width: w, height: h };
}

function setCanvasPageSize() {
    const page = getPageDimensions();
    const w = page.width;
    const h = page.height;
    document.querySelector(`#canvas-area #canvas-page-${layers[activeLayer].name}`).style.width = w + 'px';
    document.querySelector(`#canvas-area #canvas-page-${layers[activeLayer].name}`).style.height = h + 'px';
}