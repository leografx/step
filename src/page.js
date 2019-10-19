function getPageDimensions() {
    const actualWidth = getValueAsFloat('#width');
    const actualHeight = getValueAsFloat('#height');
    const w = actualWidth * scaleFactor;
    const h = actualHeight * scaleFactor;
    return { width: w, height: h, actualWidth: actualWidth, actualHeight: actualHeight };
}

function centerPageInViewPort() {
    const canvasArea = getCanvasAreaDimensions();
    const pageSize = getPageDimensions();

    document.querySelector(`#canvas-page-${layers[activeLayer].name}`).style.marginLeft = (canvasArea.width - pageSize.width) / 2 + 'px';
    document.querySelector(`#canvas-page-${layers[activeLayer].name}`).style.marginTop = (canvasArea.height - pageSize.height) / 2 + 'px';

}