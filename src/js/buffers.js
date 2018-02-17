//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl) {
    allBuffers = [];
    models.forEach(function(model){
  
          newPositions = [];
          newCoords = [];
          newIndices = [];
  
          parsedModel = Content.wavefrontObjParser(model);
          //console.log(parsedModel);
          newPositions = [].concat.apply([], parsedModel.vertices);
          //console.log(newPositions);
  
          // Create a buffer for the cube's vertex positions.
  
          var positionBuffer = gl.createBuffer();
  
          // Select the positionBuffer as the one to apply buffer
          // operations to from here out.
  
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newPositions), gl.STATIC_DRAW);
  
          newCoords = [].concat.apply([], parsedModel.texturecoords);
          //console.log(newCoords);
  
          var textureCoordBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newCoords),
                        gl.STATIC_DRAW);
  
          // Build the element array buffer; this specifies the indices
          // into the vertex arrays for each face's vertices.
  
          newIndices = [].concat.apply([], parsedModel.indices);
          //console.log(newIndices);
  
          var indexBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
              new Uint16Array(newIndices), gl.STATIC_DRAW);
  
          
  
          /* return {
            position: positionBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
          }; */
          allBuffers.push({
            position: positionBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
            count : newPositions.length
          });
    });
    return allBuffers; 
  }