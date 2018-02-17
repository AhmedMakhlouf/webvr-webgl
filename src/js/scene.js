//
// Draw the scene.
//
function prepareGLScene(gl, programInfo, allBuffers, texture, deltaTime) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  
    // Clear the canvas before we start drawing on it.
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  
    vr.display.getFrameData(vr.frameData);

    //Left side
    projectionMatrix = vr.frameData.leftProjectionMatrix;
    modelViewMatrix = vr.frameData.leftViewMatrix;
    gl.viewport(0, 0, canvasWidth/2, canvasHeight);

    drawScene(projectionMatrix,modelViewMatrix);

    //Right side
    projectionMatrix = vr.frameData.rightProjectionMatrix;
    modelViewMatrix = vr.frameData.rightViewMatrix;
    gl.viewport(canvasWidth/2, 0, canvasWidth/2, canvasHeight);

    drawScene(projectionMatrix,modelViewMatrix);
}


function drawScene(projectionMatrix, modelViewMatrix)
{
    if (allBuffers.lenght == 0)
    {
        return;
    }
    allBuffers.forEach(function(buffers){
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL how to pull out the texture coordinates from
    // the texture coordinate buffer into the textureCoord attribute.
    {
        const numComponents = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
        gl.vertexAttribPointer(
            programInfo.attribLocations.textureCoord,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.textureCoord);
    }

    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

    // Specify the texture to map onto the faces.

    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0);

    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

    {
        const vertexCount = buffers.count / 3;
        //console.log(modelsSize[i].vertices.length / 10);
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        //gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
    }
});
}

function update(){
const buffers = initBuffers(gl);
var then = 0;
// Draw the scene repeatedly
function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    prepareGLScene(gl, programInfo, buffers, texture, deltaTime);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
}