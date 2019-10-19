function calculateScaleFactor() {
    const canvas = getCanvasAreaDimensions();
    const page = getPageDimensions();
    const ifTrue = ((canvas.height - scaleFactor) / (page.height / scaleFactor));
    const ifFalse = ((canvas.width - scaleFactor) / (page.width / scaleFactor))

    scaleFactor = (page.height >= page.width) ? ifTrue : ifFalse;
}