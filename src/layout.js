function createLayout() {
    const columns = getColumns();
    const rows = getRows();
    const boxCount = columns * rows;
    const trimSize = getTrimSize();
    const gutters = getGutters();
    let start = getStartingNumber();
    const prefix = getPrefix();
    const postfix = getPostfix();


    let layerArea = `
            <div class="trim-area" id="${layers[activeLayer].name}" style="display:grid; 
                grid-template-columns:repeat(${columns}, ${trimSize.width}px);
                grid-template-rows: repeat(${rows}, ${trimSize.height}px);
                column-gap: ${gutters.x}px;
                row-gap: ${gutters.y}px;">
            </div>`;
    let divBox = '';
    for (let i = 0; i < boxCount; i++) {
        divBox += `<div class="${layers[activeLayer].name}" style="border: 1px solid silver; background: transparent;"> 
                <div style="position:absolute;
                    height:${layers[activeLayer].height * scaleFactor}px; 
                    width:${layers[activeLayer].width * scaleFactor}px;
                    text-align:${layers[activeLayer].textAlign};
                    border: 1px solid yellow; 
                    background-color:transparent;">${prefix}${start++}${postfix}
                </div> 
            </div>`;
    }
    document.querySelector(`#canvas-page-${layers[activeLayer].name}`).innerHTML = layerArea;
    document.querySelector('#' + layers[activeLayer].name).innerHTML = divBox;
    calculateMargins();
    itemTextChange();
}