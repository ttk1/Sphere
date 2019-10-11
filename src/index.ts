import { rotation } from './rotation';

window.onload = () => {
  const canvas = document.createElement('canvas');
  document.getElementById('container').appendChild(canvas);
  canvas.width = 500;
  canvas.height = 500;

  const gl = canvas.getContext('webgl2');
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  function getShader(type: number, source: string) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  const program = gl.createProgram();
  const vertexShader =
    getShader(gl.VERTEX_SHADER, require('./glsl/vert.glsl').default);
  gl.attachShader(program, vertexShader);
  const fragmentShader =
    getShader(gl.FRAGMENT_SHADER, require('./glsl/frag.glsl').default);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const sizeLoc = gl.getUniformLocation(program, 'size');
  gl.uniform2f(sizeLoc, canvas.width, canvas.height);

  const image = document.createElement('img');
  image.src = './moon.jpeg';

  image.onload = () => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    let mouseX: number = null;
    let mouseY: number = null;
    let rot = rotation(0, 0, 0);
    const rotIdx = gl.getUniformLocation(program, 'rot');
    gl.uniformMatrix4fv(rotIdx, false, rot.toArray());
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    canvas.addEventListener('mousemove', onMouseMove, false);

    function onMouseMove(event: MouseEvent) {
      let diffX: number;
      let diffY: number;
      if (mouseX == null || mouseY == null) {
        diffX = event.offsetX;
        diffY = event.offsetY;
      } else {
        diffX = mouseX - event.offsetX;
        diffY = mouseY - event.offsetY;
      }
      mouseX = event.offsetX;
      mouseY = event.offsetY;

      rot = rotation(diffY * 0.02, diffX * 0.02, 0).mul(rot);
      gl.uniformMatrix4fv(rotIdx, false, rot.toArray());
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
  };
};
