function applyListeners() {
    document.querySelectorAll('.collapsible-trigger').forEach(element => {
        element.addEventListener('click', toggle);
    });

    document.querySelectorAll('#page-properties input').forEach(element => {
        element.addEventListener('change', onChange);
    });

    document.querySelectorAll('.align').forEach(element => {
        element.addEventListener('click', changeTextAlignment);
    });
}