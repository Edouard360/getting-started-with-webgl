var canvas;
var gl;
var squareVerticesBuffer;
var shaderProgram;
var vertexPositionAttribute;



function start() {
  canvas = document.getElementById("glcanvas");
  gl = canvas.getContext("webgl");

  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  //************** Creating the buffers ************************//

  squareVerticesBuffer = gl.createBuffer();
  squareColorsBuffer = gl.createBuffer();   

  var vertices = [
    1.0,  1.0,  0.0,
    -1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
    -1.0, -1.0, 0.0
  ];

  var colors = [
    1.0,  0,  0,  // color of vertex 1
    0, 1.0,  0,   // color of vertex 2
    0, 1.0, 0,   // color of vertex 3
    0, 0, 1.0    // color of vertex 4
  ];
  
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, squareColorsBuffer); 
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null); 

  //************** Creating the shaders ************************//

  var vertexShaderSource = document.getElementById("shader-vs").firstChild.textContent;
  var  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  var fragmentShaderSource = document.getElementById("shader-fs").firstChild.textContent;
  var  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  gl.useProgram(shaderProgram);

  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "position");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  vertexColorAttribute = gl.getAttribLocation(shaderProgram, "color");
  gl.enableVertexAttribArray(vertexColorAttribute);

  drawScene();
}

function drawScene() {

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareColorsBuffer);
  gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);
  
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(drawScene);
}
