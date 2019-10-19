function leftPad(value) { return (value.toString().length < paddingAmount) ? leftPad("0" + value) : value; }

function calculateLeftPadAmount() {
    const start = getValueAsInt('#start');
    const quantity = getValueAsInt('#quantity');
    return (start + quantity).toString().length;
}