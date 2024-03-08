const triangle = document.querySelector('.triangulo');
let isDraggingTriangle1 = false;
let offsetX1, offsetY1;

triangle.addEventListener('mousedown', (e) => {
    isDraggingTriangle1 = true;
    offsetX1 = e.clientX - parseFloat(window.getComputedStyle(triangle).left);
    offsetY1 = e.clientY - parseFloat(window.getComputedStyle(triangle).top);
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingTriangle1) {
        triangle.style.left = `${e.clientX - offsetX1}px`;
        triangle.style.top = `${e.clientY - offsetY1}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingTriangle1 = false;
});

const triangle_2 = document.querySelector('.triangulo_2');
let isDraggingTriangle2 = false;
let offsetX2, offsetY2;

triangle_2.addEventListener('mousedown', (e) => {
    isDraggingTriangle2 = true;
    offsetX2 = e.clientX - parseFloat(window.getComputedStyle(triangle_2).left);
    offsetY2 = e.clientY - parseFloat(window.getComputedStyle(triangle_2).top);
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingTriangle2) {
        triangle_2.style.left = `${e.clientX - offsetX2}px`;
        triangle_2.style.top = `${e.clientY - offsetY2}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingTriangle2 = false;
});

const triangle_3 = document.querySelector('.triangulo_3');
let isDraggingTriangle3 = false;
let offsetX3, offsetY3;

triangle_3.addEventListener('mousedown', (e) => {
    isDraggingTriangle3 = true;
    offsetX3 = e.clientX - parseFloat(window.getComputedStyle(triangle_3).left);
    offsetY3 = e.clientY - parseFloat(window.getComputedStyle(triangle_3).top);
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingTriangle3) {
        triangle_3.style.left = `${e.clientX - offsetX3}px`;
        triangle_3.style.top = `${e.clientY - offsetY3}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingTriangle3 = false;
});
const triangle_4 = document.querySelector('.triangulo_4');
let isDraggingTriangle4 = false;
let offsetX4, offsetY4;

triangle_4.addEventListener('mousedown', (e) => {
    isDraggingTriangle4 = true;
    offsetX4 = e.clientX - parseFloat(window.getComputedStyle(triangle_4).left);
    offsetY4 = e.clientY - parseFloat(window.getComputedStyle(triangle_4).top);
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingTriangle4) {
        triangle_4.style.left = `${e.clientX - offsetX4}px`;
        triangle_4.style.top = `${e.clientY - offsetY4}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingTriangle4 = false;
});