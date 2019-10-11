!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1);window.onload=()=>{const e=document.createElement("canvas");document.getElementById("container").appendChild(e),e.width=500,e.height=500;const t=e.getContext("webgl2");function o(e,n){const r=t.createShader(e);if(t.shaderSource(r,n),t.compileShader(r),!t.getShaderParameter(r,t.COMPILE_STATUS))throw new Error(t.getShaderInfoLog(r));return r}t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT);const a=t.createProgram(),i=o(t.VERTEX_SHADER,n(3).default);t.attachShader(a,i);const s=o(t.FRAGMENT_SHADER,n(4).default);t.attachShader(a,s),t.linkProgram(a),t.useProgram(a);const u=t.getUniformLocation(a,"size");t.uniform2f(u,e.width,e.height);const c=document.createElement("img");c.src="./moon.jpeg",c.onload=()=>{const n=t.createTexture();t.bindTexture(t.TEXTURE_2D,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,c);let o=null,i=null,s=r.rotation(0,0,0);const u=t.getUniformLocation(a,"rot");t.uniformMatrix4fv(u,!1,s.toArray()),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLE_FAN,0,4),e.addEventListener("mousemove",(function(e){let n,a;null==o||null==i?(n=0,a=0):(n=o-e.offsetX,a=i-e.offsetY);o=e.offsetX,i=e.offsetY,s=r.rotation(.02*a,.02*n,0).mul(s),t.uniformMatrix4fv(u,!1,s.toArray()),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLE_FAN,0,4)}),!1)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2);t.rotation=function(e,t,n){const o=new r.Mat4(4,4);o.setValue(0,0,1),o.setValue(1,1,Math.cos(e)),o.setValue(2,1,-Math.sin(e)),o.setValue(1,2,Math.sin(e)),o.setValue(2,2,Math.cos(e)),o.setValue(3,3,1);const a=new r.Mat4(4,4);a.setValue(0,0,Math.cos(t)),a.setValue(2,0,Math.sin(t)),a.setValue(1,1,1),a.setValue(0,2,-Math.sin(t)),a.setValue(2,2,Math.cos(t)),a.setValue(3,3,1);const i=new r.Mat4(4,4);return i.setValue(0,0,Math.cos(n)),i.setValue(1,0,-Math.sin(n)),i.setValue(0,1,Math.sin(n)),i.setValue(1,1,Math.cos(n)),i.setValue(2,2,1),i.setValue(3,3,1),o.mul(a).mul(i)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(e,t){this.m=e,this.n=t,this.init()}toArray(){const e=[];for(let t=0;t<this.m;t++)for(let n=0;n<this.n;n++)e[t+this.m*n]=this.matrix[t][n];return e}getValue(e,t){return this.matrix[e][t]}setValue(e,t,n){this.matrix[e][t]=n}mul(e){if(this.n!==e.m)throw new Error("サイズの不一致");const t=new r(this.m,e.n);for(let r=0;r<this.m;r++)for(let o=0;o<e.n;o++)t.setValue(r,o,n(r,o,this,e));return t;function n(e,t,n,r){let o=0;for(let a=0;a<n.n;a++)o+=n.getValue(e,a)*r.getValue(a,t);return o}}init(){this.matrix=[];for(let e=0;e<this.m;e++){this.matrix[e]=[];for(let t=0;t<this.n;t++)this.matrix[e][t]=0}}}t.Mat4=r},function(e,t,n){"use strict";n.r(t),t.default="#version 300 es\n\nconst vec4 p[] = vec4[](\n\tvec4(1.0, -1.0, 0.0, 1.0),\n\tvec4(1.0, 1.0, 0.0, 1.0),\n\tvec4(-1.0, 1.0, 0.0, 1.0),\n\tvec4(-1.0, -1.0, 0.0, 1.0)\n);\n\nin float a;\n\nvoid main() {\n  gl_Position = p[gl_VertexID];\n}\n"},function(e,t,n){"use strict";n.r(t),t.default="#version 300 es\n\nprecision mediump float;\n\nout vec4 color;\nuniform sampler2D tex;\nuniform vec2 size;\nuniform mat4 rot;\n\nconst vec4 ray = vec4(0.0, 0.0, 1.0, 1.0);\nconst float radius = 0.8;\n\nvoid main() {\n  vec2 p = ((gl_FragCoord.xy / size) * 2.0 - 1.0) / radius;\n  if (length(p) < 1.0) {\n    float intensity = dot(normalize(vec3(rot * ray)), vec3(p, sqrt(1.0 - dot(p, p))));\n    ivec2 texCoord = ivec2(vec2(textureSize(tex, 0)) * (p + 1.0) / 2.0);\n    color = vec4(vec3(texelFetch(tex, texCoord, 0)) * intensity, 1.0);\n  } else {\n    discard;\n  }\n}\n"}]);