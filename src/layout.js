function createLayout() {
    const columns = getColumns();
    const rows = getRows();
    const boxCount = columns * rows;
    const trimSize = getTrimSize();
    const gutters = getGutters();
    let start = getStartingNumber();
    const prefix = getPrefix();
    const postfix = getPostfix();
    const margins = getMargins();
    let resizeHandle = `<input type="number" 
    id="handle-margin-top"
    step=".0625" max="${trimSize.height / scaleFactor}" class="handle-top-right" 
    onchange="changeMargins('top')"
    style="font-size: 14px; 
    color:#666; 
    width:70px; height: 30px;
     position:absolute; 
     left: ${(trimSize.width - 70 )/ 2}px;"
     value="${margins.top / scaleFactor}">
    <span class="handle-top-left">&nbsp;</span>
    <span class="handle-bottom-left">&nbsp;</span>
    <span class="handle-bottom-right">&nbsp;</span>`;


    let layerArea = `
            <div class="trim-area" id="${layers[activeLayer].name}"
                style="display:grid; 
                grid-template-columns:repeat(${columns}, ${trimSize.width}px);
                grid-template-rows: repeat(${rows}, ${trimSize.height}px);
                column-gap: ${gutters.x}px;
                row-gap: ${gutters.y}px;">
            </div>`;
    let divBox = '';


    for (let i = 0; i < boxCount; i++) {

        divBox += `<div class="${layers[activeLayer].name} top-right" style="border: 1px solid silver; background: transparent;"> 
            <div style="position:absolute;
                    height:${(layers[activeLayer].height * scaleFactor) - (margins.top + margins.bottom) }px; 
                    width:${(layers[activeLayer].width * scaleFactor) - (margins.left + margins.right )}px;
                    text-align:${layers[activeLayer].textAlign};
                    border: 1px solid rgba(0, 110, 255, 0.568); 
                    background-color:transparent;">${prefix}${start++}${postfix}
                    ${(i===0)? resizeHandle: ''}
                </div>  
            </div>`;
    }


    document.querySelector(`#canvas-page-${layers[activeLayer].name}`).innerHTML = layerArea;
    document.querySelector('#' + layers[activeLayer].name).innerHTML = divBox;
    calculateMargins();
    itemTextChange();
}