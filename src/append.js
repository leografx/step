function setPostfix() { layers[activeLayer].postfix = pageProperties.querySelector('#postfix').value }

function setPrefix() { layers[activeLayer].prefix = pageProperties.querySelector('#prefix').value }

function getPostfix() { return layers[activeLayer].postfix }

function getPrefix() { return layers[activeLayer].prefix }