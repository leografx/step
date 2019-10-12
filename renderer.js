let pageProperties = document.querySelector('#page-properties');
let paddingAmount = 0;
let doLeftPad = false;

// Page properties add event listener on change
pageProperties.querySelectorAll('input').forEach(element => {
    element.addEventListener('change', propertyChange);
});

function propertyChange(element) {
    paddingAmount = autoLengthPadding();
    if (element.target.id === 'left-pad') {
        doLeftPad = element.target.checked;
    }


    if (doLeftPad) {
        console.log(doLeftPad)
    }
}



function autoLengthPadding() {
    const start = parseInt(document.querySelector('#start').value);
    const quantity = parseInt(document.querySelector('#quantity').value);
    return (start + quantity).toString().length;
}

function leftPad(value) {
    return (value.toString().length < paddingAmount) ? leftPad("0" + value) : value;
}