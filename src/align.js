function changeTextAlignment(e) {
    let icons = document.querySelectorAll('.align');
    icons[0].src = 'images/lnr-text-align-left.svg';
    icons[1].src = 'images/lnr-text-align-center.svg';
    icons[2].src = 'images/lnr-text-align-right.svg';
    console.log(e.target.id);
    layers[activeLayer].textAlign = e.target.id;
    e.target.src = e.target.alt;
    onChange();
}