// setters
function setDOMPageProperties() { pageProperties = document.querySelector('#page-properties') }

function onChange() {
    setDOMPageProperties();
    setPrefix();
    setPostfix();
    layers[activeLayer].fontSize = getValueAsFloat('#font-size');
    layers[activeLayer].fontColor = pageProperties.querySelector('#font-color').value;
    setMargins();
    paddingAmount = calculateLeftPadAmount();
    calculateScaleFactor();
    setCanvasPageSize();
    createLayout();
    centerPageInViewPort();

}

(function onInit() {
    window.onresize = function() {
        onChange();
    }

    applyListeners();
    onChange();
}());