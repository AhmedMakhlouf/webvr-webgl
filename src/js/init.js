const canvas = document.querySelector('#glcanvas');
gl = canvas.getContext('webgl');

canvas.width = window.innerWidth; //document.width is obsolete
canvas.height = window.innerHeight; //document.height is obsolete

canvasWidth = canvas.width;
canvasHeight = canvas.height;
// If we don't have a GL context, give up now
if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
}

