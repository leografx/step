function toggle(e) {
    const section = document.getElementById('toggle-' + e.target.parentNode.id);
    const chevronRight = 'images/lnr-chevron-right.svg';
    const chevronDown = 'images/lnr-chevron-down.svg';

    try {
        if (section.style.display !== 'grid') {
            section.style.display = 'grid';
            e.target.parentNode.firstElementChild.src = chevronDown;
            e.target.parentNode.style.borderBottom = '0px';
        } else {
            section.style.display = 'none';
            e.target.parentNode.firstElementChild.src = chevronRight;
            e.target.parentNode.style.borderBottom = '1px solid #2A2A2A';
        }
    } catch {
        console.log('Oops!');
    }
}