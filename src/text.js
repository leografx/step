function itemTextChange() {
    const fontSize = layers[activeLayer].fontSize;
    const fontColor = layers[activeLayer].fontColor;
    document.querySelectorAll(`.${layers[activeLayer].name}`).forEach(element => {
        element.firstElementChild.style.fontSize = ((fontSize / 72) * scaleFactor) + 'px';
        element.firstElementChild.style.color = fontColor;
        element.firstElementChild.style.marginLeft = getMargins().left + 'px';
        element.firstElementChild.style.marginTop = getMargins().top + 'px';
        element.firstElementChild.style.marginRight = getMargins().right + 'px';
        element.firstElementChild.style.marginBottom = getMargins().bottom + 'px';
    });
}