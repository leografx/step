let layers = [{
    name: 'layer0',
    margins: { left: 0, right: 0, top: 0, bottom: 0 },
    x: 0,
    y: 0,
    width: 3.5,
    height: 2,
    fontColor: '#000000',
    textAlign: 'right',
    fontSize: 14,
    prefix: 'Hello world of worlds!',
    postfix: ''
}];


function createLayer() {
    layers.push('layer' + layers.length);
}