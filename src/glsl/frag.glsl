#version 300 es

precision mediump float;

out vec4 color;
uniform vec2 size;
uniform mat4 rot;

const vec4 ray = vec4(1.0, 1.0, 0.0, 1.0);
const float radius = 0.8;

void main() {
  vec2 p = ((gl_FragCoord.xy / size) * 2.0 - 1.0) / radius;
  if (length(p) < 1.0) {
    float intensity = dot(normalize(vec3(rot * ray)), vec3(p, sqrt(1.0 - dot(p, p))));
    color = vec4(vec3(1.0, 0.98, 0.8) * intensity, 1.0);
  } else {
    discard;
  }
}
