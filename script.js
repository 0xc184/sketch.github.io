const canvas = document.getElementById('geometriCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const eraserCheckbox = document.getElementById('eraserCheckbox');
const footer = document.getElementById('footer');

let drawing = false;
let shape = 'line';
let currentColor = colorPicker.value;
let colorPickerDragging = false;

colorPicker.addEventListener('input', changeColor);
colorPicker.addEventListener('mousedown', startDraggingColorPicker);
document.addEventListener('mouseup', stopDraggingColorPicker);
document.addEventListener('mousemove', dragColorPicker);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
document.addEventListener('keydown', changeShape);

canvas.width = 1920;
canvas.height = 1080;

function startDraggingColorPicker(e) {
    colorPickerDragging = true;
}

function stopDraggingColorPicker() {
    colorPickerDragging = false;
}

function dragColorPicker(e) {
    if (colorPickerDragging) {
        colorPicker.style.left = e.clientX - colorPicker.clientWidth / 2 + 'px';
        colorPicker.style.top = e.clientY - colorPicker.clientHeight / 2 + 'px';
    }
}

function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

    if (eraserCheckbox.checked) {
        ctx.globalCompositeOperation = 'destination-out'; // Silgi modu
        ctx.lineWidth = 20; // Silgi kalınlığı
    } else {
        ctx.globalCompositeOperation = 'source-over'; // Normal çizim modu
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2; // Çizgi kalınlığı
    }
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
}

function changeShape(e) {
    switch(e.key) {
        case 'l':
            shape = 'line';
            break;
        case 'c':
            shape = 'circle';
            break;
        case 'r':
            shape = 'rectangle';
            break;
    }
}

function changeColor() {
    currentColor = colorPicker.value;
    if (!eraserCheckbox.checked) {
        ctx.strokeStyle = currentColor;
        ctx.globalCompositeOperation = 'source-over'; // Normal çizim modu
        ctx.lineWidth = 2; // Çizgi kalınlığı
    }
}
